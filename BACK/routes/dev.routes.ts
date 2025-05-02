import { Request, Response, Router } from "express";
import { Swagger } from "../_super_express/Swagger";

Swagger.addApiPath('dev', '/api/dev', {
	"/": { get: Swagger.getBasicGet() },
	'/{id}': { put: Swagger.getBasicPost('dev', true, [Swagger.getIdParam()], { test: { type: 'string' } }) }
});


const devRouter:Router = Router();
devRouter.get("/", async (req:Request, res:Response) => {
	res.send("Hello World");
});
devRouter.put("/:id", async (req:Request, res:Response) => {
	const bodyParam = req.body.test;
	const pathParam = req.params.id;

	res.json({ bodyParam:bodyParam, pathParam:pathParam });
});


export default devRouter;
