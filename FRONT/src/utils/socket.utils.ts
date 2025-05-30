import { SocketConnectionParams } from "@/types/socket.types";
import { io, Socket } from "socket.io-client";
import { onMounted, onUnmounted, ref, Ref } from "vue";


export const useSocket = (params:SocketConnectionParams) =>
{
    const socket:Ref<Socket | null> = ref(null);
    const DEV_URL = 'http://127.0.0.1:3000';

    onMounted(() =>
    {
        socket.value = io(`${import.meta.env.DEV ? DEV_URL : ''}/${params.namespace}`, {
            transports: ['websocket'], // Forza solo WebSocket
            timeout: 5000,
            reconnectionAttempts: 3,
            query:params.connectionQuery
        });

        for (const event in params.events ?? {})
        {
            socket.value.on(event, params.events![event]);
        }
    });

    onUnmounted(() =>
    {
        if (!socket.value) return;
        for (const event in params.events ?? {})
        {
            socket.value.off(event);
        }
    })


    return socket;
}
