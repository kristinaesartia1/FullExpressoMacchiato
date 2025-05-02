import { Server } from "socket.io";
import { log } from "./_utils";
import { SocketWrapperConstructor } from "./types/starter.sptypes";

export class SocketWrapper
{
    public readonly name:string;
    private readonly data:SocketWrapperConstructor;
    constructor (data:SocketWrapperConstructor)
    {
        this.name = data.name;
        this.data = data;
    }


    public setupConnection = (io:Server) =>
    {
        if (!this.data.listeners)
        {
            log.logError('[SOCKETWRAPPER]: No listeners configured');
            return;
        }

        io.on('connect', async (socket) =>
        {
            for (const eventName in this.data.listeners)
            {
                socket.on(eventName, this.data.listeners[eventName])
            }
        })

        if (this.data.onDisconnect) io.on('close', this.data.onDisconnect)
    }
}
