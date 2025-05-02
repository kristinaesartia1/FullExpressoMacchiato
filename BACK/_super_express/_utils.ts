import { Response } from "express";
import { Logger } from "utils-logger-av";
import { ErrorsMapping, ExpressReturn } from "./types/generic.sptypes";

export const log:Logger = new Logger({ primaryColor: "cyan", logFilePath:'./errors.log' });
export const apiOk = (res:any, status:number = 200, contentType?:string):ExpressReturn => ({ result:res, status, contentType, isOk:true })
export const apiNok = (res:any, status:number = 500):ExpressReturn => ({ result:res, status, isOk:false })
export const errorCatcher = (res:Response, err:unknown, errorsList?:ErrorsMapping, errorString?:string) =>
{
    if (errorString) fullLogNok('api-dynamicdb', errorString);
    if (err instanceof Error === false) {
        res.status(500).send({ message: err });
        return;
    }


    // const error:ErrorsMapping | null = errorsList?.find(x => x.errorMessage === err.message) ?? null;
    const error = (errorsList ?? {})[err.message] ?? null;
    if (!error) res.status(500).send({ message: err.message });
    else res.status(error.status ?? 500).send({ message: error.responseMessage ?? err.message });
};


export const fullLogOk = (service:string, message:string) =>
{
    log.ok(`[${service.toUpperCase()}]: ${message}`);
    log.logFile(`[${service.toUpperCase()}]: ${message}`);
}
export const fullLogNok = (service:string, error:any, ...args:any[]) =>
{
    const errMessage:string = (error as Error)?.message ?? error
    log.nok(`[${service.toUpperCase()}]: ${errMessage}`);
    log.logFile(`[${service.toUpperCase()}]: ${errMessage}, ${args.join(',')}`, 'error');
}
