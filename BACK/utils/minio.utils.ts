import { Client } from "minio";
import Stream from "stream";
import { fullLogNok, fullLogOk } from "../_super_express/_utils";


export class Minio
{
    public static readonly profilePicBucket = 'profilepics'
    public static readonly client = new Client({
        endPoint: process.env['MINIO_ENDPOINT'] ?? '12.0.0.7',
        port: parseInt(process.env['MINIO_PORT'] ?? '9000'),
        useSSL: process.env['MINIO_SSL'] === 'true',
        accessKey: process.env['MINIO_ACCESS_KEY'],
        secretKey: process.env['MINIO_SECRET_KEY'],
    });

    public static putObject = async (bucket:string, writingFileName:string, content:string | Buffer, metadata?:any) =>
    {
        try
        {
            const exists = await this.client.bucketExists(bucket)
            if (!exists)
            {
                await this.client.makeBucket(bucket)
                fullLogOk('minio', `Bucket ${bucket} created`)
            }

            await this.client.putObject(bucket, writingFileName, content, metadata)
            return true;
        }
        catch (err)
        {
            fullLogNok('minio', err);
            return false;
        }
    }



    public static getProfilePic = async (id:string) =>
    {
        try
        {
            const minioRes = await this.client.getObject(this.profilePicBucket, `${id}.png`)
            const minioBuffer = await this.streamToBuffer(minioRes)
            const imgBase64 = minioBuffer.toString('base64');

            return imgBase64;
        }
        catch (err)
        {
            fullLogNok('minio', err, id);
            return null;
        }
    }


    private static streamToBuffer = async (stream:Stream.Readable) =>
    {
        const chunks = [];
        for await (const chunk of stream) chunks.push(chunk);
        return Buffer.concat(chunks);
    };
}
