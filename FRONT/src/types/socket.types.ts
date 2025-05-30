export type SocketConnectionParams = {
    namespace:string,
    connectionQuery?:Record<string, any>,
    events?:Record<string, (...args:any[]) => void | Promise<void>>
};
