import bodyParser from "body-parser";
import cors from "cors";
import { getCompiledPath, Starter } from "expresso-macchiato";
import { projectConfig } from "./_configs";
import { fileRouter } from "./routes/files.routes";
import { noteRoutes } from "./routes/notes.routes";
import { salesRouter } from "./routes/sales.routes";
import { testRoutes } from "./routes/test.routes";
import { userRouter } from "./routes/user.routes";
import { tokenApiOptions, tokenInstance } from "./utils/token.utils";

const [entities, migrations] = getCompiledPath(__filename, __dirname, ['db/models/**/*', 'db/migrations/**/*']).map(p => [p])
new Starter({
	projectConfig,
	db: { entities, migrations },
	tokenOptions: { tokenInstance, api:tokenApiOptions },
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
