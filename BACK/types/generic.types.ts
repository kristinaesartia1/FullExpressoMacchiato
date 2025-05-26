export type ErrorsMapping = Record<string, { status?:number, responseMessage?:string }>;

export type MyProjectConfig = {
    MINIO_ENDPOINT:string,
    MINIO_PORT?:number,
    MINIO_SSL?:boolean,
    MINIO_ACCESS_KEY?:string,
    MINIO_SECRET_KEY?:string,
}
