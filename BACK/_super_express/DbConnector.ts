import "reflect-metadata";
import { DataSource, EntitySchema, MixedList } from "typeorm";
import { log } from "./_utils";
import { ProjectConfigs, SwaggerMetadataInterface } from "./types/generic.sptypes";


export class DbConnector
{
    private static DataSource:DataSource;
    public static getDataSource = () => this.DataSource;
    private readonly projectConfig:ProjectConfigs;
    constructor(projectConfig:ProjectConfigs)
    {
        this.projectConfig = projectConfig;
    }


    connect = async (entities:MixedList<Function | string |EntitySchema>, migrations?:string[]) =>
    {
        try
        {
            if (!this.projectConfig.DB_DIALECT || !this.projectConfig.DB_NAME) throw new Error("[DB-CONNECTOR]\tMissing configs =>DB_DIALECT || DB_NAME");

            const AppDataSource = new DataSource({
                type:this.projectConfig.DB_DIALECT as "postgres" | "mysql" | "sqlite",
                host: this.projectConfig.DB_HOST,
                port: this.projectConfig.DB_PORT,
                username: this.projectConfig.DB_USER,
                password: this.projectConfig.DB_PASSWORD,
                database: this.projectConfig.DB_NAME,
                entities,
                synchronize: true,
                logging: false,
                migrations
            })

            await AppDataSource.initialize();
            await AppDataSource.synchronize();

            DbConnector.DataSource = AppDataSource;

            log.magenta(`ORM CONNECTED`);
        }
        catch(err)
        {
            log.logError(err)
        }
    }
}


class ModelsMetadata
{
    static MetadataKey = Symbol("customMetadata");

    /**
     * @Description
     * Decorator to use inside model declarations, used inside db router for dynamically create swagger props
     */
    SwaggerMetadata(metadata: SwaggerMetadataInterface) {
        return function (target: any, propertyKey: string) {
            Reflect.defineMetadata(ModelsMetadata.MetadataKey, metadata, target, propertyKey);
        };
    }

    /**
     * @Description
     * Retrieves the decorator data.
     */
    getCustomMetadata(target: any, propertyKey: string):SwaggerMetadataInterface {
        return Reflect.getMetadata(ModelsMetadata.MetadataKey, target, propertyKey);
    }
}
const { SwaggerMetadata, getCustomMetadata } = new ModelsMetadata();
export { getCustomMetadata, SwaggerMetadata };
