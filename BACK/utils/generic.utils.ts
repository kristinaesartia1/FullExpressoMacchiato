import { Response } from "express";
import { Logger, LoggerConstructor } from "utils-logger-av";
import { GenericUtils, GenericUtilsConstructor } from "utils-stuff";
import { Methods } from "../_super_express/types/generic.sptypes";
import { ErrorsMapping } from "../types/generic.types";

// --- Logger

class MyLogger extends Logger
{
	constructor(constructor:LoggerConstructor) { super(constructor); }

	logApi = (method:Methods, apiName:string, params:Array<{ key:string, value:any }> = []) =>
	{
		this.base(`${method}\t\t${apiName}`);
		for (const p of params) this.logDetail(`${p.key}\t\t${p.value}`);
	};

	logResponse = () => this.green("STATUS: 200");
}
const log:MyLogger = new MyLogger({ primaryColor: "cyan", logFilePath:'./errors.log' });


// --- Utils
class Utils extends GenericUtils
{
	constructor(constructor:GenericUtilsConstructor) { super(constructor); }

	errorCatcher = (res:Response, err:unknown, errorsList?:ErrorsMapping) =>
	{
		log.logError(err);
		log.logFile((err as Error)?.message ?? err, "error");
		if (err instanceof Error === false) {
			res.status(500).send({ message: err });
			return;
		}


		// const error:ErrorsMapping | null = errorsList?.find(x => x.errorMessage === err.message) ?? null;
		const error = (errorsList ?? {})[err.message] ?? null;
		if (!error) res.status(500).send({ message: err.message });
		else res.status(error.status ?? 500).send({ message: error.responseMessage ?? err.message });
	};
}

const { resOk, resError, errorCatcher, sleep } = new Utils({ locale: "it-IT" });



// --- Export
export { errorCatcher, log, resError, resOk, sleep };
