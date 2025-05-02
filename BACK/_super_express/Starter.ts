import express, { Express } from "express";
import http from "https";
import path from "path";
import { Server, Server as SocketServer } from "socket.io";
import swaggerUi from "swagger-ui-express";
import { EntitySchema, MixedList } from "typeorm";
import { log } from "./_utils";
import { DbConnector } from "./DbConnector";
import { RouterWrapper } from "./RouterWrapper";
import { SocketWrapper } from "./SocketWrapper";
import { Swagger } from "./Swagger";
import { ProjectConfigs } from "./types/generic.sptypes";
import { StarterOptions } from "./types/starter.sptypes";

export class Starter
{
	constructor(options:StarterOptions)
	{
		try
		{
			this.init(options);
		}
		catch (err)
		{
			log.logError(err);
		}
	}


	private init:(options:StarterOptions) => void = async (options) =>
	{
		const app:Express = express();


		// --- DB
		if (options.db)
		{
			await this.initDb(options.projectConfig, options.db.entities, options.db.migrations);
			if (options.db.afterDbConnection) await options.db.afterDbConnection();
		}

		// --- Plugins
		for (const plugin of options.plugins ?? []) app.use(plugin);

		// --- Routers
		for (const router of options.routers ?? []) app.use(router.basePath, router.createExpressRouter())

		// --- Swagger
		if (options.swagger === undefined || options.swagger) {
			Swagger.addServer({ url: `http://127.0.0.1:${options.projectConfig.SERVER_PORT}` })

			app.get('/swagger', (_, res) => {
				const openAPIDocument = Swagger.generateOpenAPIDocument();
				res.json(openAPIDocument);
			});
			app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(undefined, {
				swaggerOptions: {
					url: "/swagger"
				}
			}));
		}

		// --- Client
		if (options.clientPath)
		{
			const clientPath =  path.resolve(process.cwd(), "client");
			app.use(express.static(clientPath));

			app.get("/apiUrl", (_, res) => res.send(process.env['API_URL']))
			app.get(options.tokenAuthApi ?? '/api/auth', RouterWrapper.setAuthApi);
			app.get("*", (_, res) => {
				res.sendFile(path.join(clientPath as string, "index.html"));
			});
		}

		// --- Before App Listening
        if (options.beforeStartListening) options.beforeStartListening(app);

		// --- Listen App
		if ((options.sockets?.length ?? 0) === 0) app.listen(options.projectConfig.SERVER_PORT, () => log.base("Server started.", `Listening on port ${options.projectConfig.SERVER_PORT}`));
		else
		{
			const server = http.createServer(app)
			const io = new SocketServer(server, {
				cors: {
					origin: ['*'],
					methods:['*']
				}
			});


			await this.initSockets(io, options.sockets!);
			server.listen(options.projectConfig.SERVER_PORT, () => log.base("Server started.", `Listening on port ${options.projectConfig.SERVER_PORT}`))
		}
	};

	private initDb = async (projectConfig:ProjectConfigs, entities:MixedList<Function | string |EntitySchema>, migrations?:string[]) =>
	{
		const connector = new DbConnector(projectConfig)
		await connector.connect(entities, migrations)
	}

	private initSockets = async (io:Server, sockets:Array<SocketWrapper>) =>
	{
		for (const socket of sockets)
		{
			socket.setupConnection(io);
		}
	}
}
