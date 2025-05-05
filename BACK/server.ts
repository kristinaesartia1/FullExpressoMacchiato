import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { projectConfig } from "./_configs";
import { Starter } from "./_super_express/Starter";
import { fileRouter } from "./routes/files.routes";
import { noteRoutes } from "./routes/notes.routes";
import { salesRouter } from "./routes/sales.routes";
import { testRoutes } from "./routes/test.routes";
import { userRouter } from "./routes/user.routes";

const isCompiled = __filename.endsWith('.js');
const getPath = (type: 'models' | 'migrations') => [path.join(__dirname, `db/${type}/**/*.${isCompiled ? 'js' : 'ts'}`).replaceAll('\\', '/')]

new Starter({
	projectConfig,
	db:
	{
		entities: getPath('models'),
		migrations: getPath('migrations'),
	},
	plugins: [cors(), bodyParser.json()],
	clientPath: "client",
	routers:[
		userRouter,
		salesRouter,
		fileRouter,
		noteRoutes,
		testRoutes
	],
});
