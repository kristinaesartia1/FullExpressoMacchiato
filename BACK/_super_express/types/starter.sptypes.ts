import { Express } from "express"
import { EntitySchema, MixedList } from "typeorm"
import { RouterWrapper } from "../RouterWrapper"
import { SocketWrapper } from "../SocketWrapper"
import { ProjectConfigs } from "./generic.sptypes"

export type StarterOptions = {
    plugins?:Array<any>,
    routers?:Array<RouterWrapper>,
    clientPath?:string,
    swagger?:boolean,
    projectConfig:ProjectConfigs,
    beforeStartListening?:(app:Express) => void,
    sockets?:Array<SocketWrapper>,
    tokenAuthApi?:string,
    db?:{
        entities:MixedList<Function | string |EntitySchema>,
        migrations?:string[],
        afterDbConnection?:() => Promise<void>
    },
}



export type SocketWrapperConstructor = {
    name:string,
    beforeConnection?:() => Promise<void>
    onDisconnect?:(...params:any[]) => Promise<void>
    listeners?:Record<string, (...params:any[]) => Promise<void>>
}
