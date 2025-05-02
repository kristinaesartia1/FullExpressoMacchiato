import { Request, RequestHandler, Response, Router } from "express";
import { User } from "../db/models/user.model";
import { Minio } from "../utils/minio.utils";
import { fullLogNok } from "./_utils";
import { DynamicDbRouter } from "./DynamicDbRouter";
import { Swagger } from "./Swagger";
import { Token } from "./Token";
import { Methods } from "./types/generic.sptypes";
import { MethodPathHandling, RouterWrapperInterface } from "./types/router.sptypes";

export class RouterWrapper
{
    public readonly basePath:string;
    private readonly data:RouterWrapperInterface;
    constructor(data:RouterWrapperInterface)
    {
        this.data = data;
        this.basePath = data.basePath.startsWith('/') ? data.basePath : `/${data.basePath}`;
    }


    public createExpressRouter = ():Router =>
    {
        const newRouter:Router = Router();

        // DbRouting logic is splitted due to optimizing swagger document creation.
        // At the bottom of this function there will be second part.
        if (this.data.dbRouting)
        {
            // If some api that would override the db routing are declared, this is to avoid creating the dbRouter ones.
            const avoidOptionsForDefinedApis: Array<Methods | 'LIST'> = [];
            if (this.data.apis?.['/']?.GET) avoidOptionsForDefinedApis.push('LIST')
            if (this.data.apis?.['/:id']?.GET) avoidOptionsForDefinedApis.push('GET')
            if (this.data.apis?.['/']?.POST) avoidOptionsForDefinedApis.push('POST')
            if (this.data.apis?.['/:id']?.PUT) avoidOptionsForDefinedApis.push('PUT')
            if (this.data.apis?.['/:id']?.DELETE) avoidOptionsForDefinedApis.push('DELETE')

            // Other then apis, check if expecially declared to avoid to create some apis.
            for (const avoid of this.data.dbRouting.avoid ?? [])
            {
                if (!avoidOptionsForDefinedApis.includes(avoid)) avoidOptionsForDefinedApis.push(avoid);
            }

            // The avoid array is passed to this method that manages everything.
            const { entity, bodyParameters, getParameters, primaryKey } = this.data.dbRouting;
            DynamicDbRouter.createDbRouter({
                entity, bodyParameters, getParameters, primaryKey,
                router:newRouter, basePath:this.data.basePath, tag:this.data.tag, avoid:avoidOptionsForDefinedApis,
                secure: this.data.dbRouting?.secure
            })
        }

        if (this.data.swaggerNewSchemas)
        {
            for (const schema in this.data.swaggerNewSchemas) Swagger.addSchema(schema, this.data.swaggerNewSchemas[schema].properties)
        }


        for (const _path in (this.data.apis ?? {}))
        {
            const path = _path.startsWith('/') ? _path : `/${_path}`;
            if (!this.data.apis || !this.data.apis[path]) continue;

            for (const method in this.data.apis[path])
            {
                if ((this.data.apis?.[path]?.[method as Methods] ?? undefined) === undefined) continue;
                const currentMethod:MethodPathHandling = this.data.apis[path][method as Methods]!;

                const middlewares:RequestHandler[] = currentMethod.middlewares ?? [];
                const callBackFunction = async (req:Request, res:Response) =>
                {
                    try
                    {
                        const handlerRes = await currentMethod.handler(req, res)

                        if (handlerRes.contentType)
                        {
                            res.set('Content-Type', handlerRes.contentType);
                            res.status(handlerRes.status ?? 200).send(handlerRes.result);
                        }
                        else if (typeof handlerRes.result === 'object') res.status(handlerRes.status).json(handlerRes.result);
                        else res.status(handlerRes.status).send(handlerRes.result);
                    }
                    catch(err)
                    {
                        fullLogNok('api', `[${method}]\t${path} => ${(err as Error).message ?? err}`);
                        res.status(500).send((err as Error)?.message ?? err);
                    }
                }

                if (method === 'GET') newRouter.get(path, middlewares, callBackFunction);
                else if (method === 'POST') newRouter.post(path, middlewares, callBackFunction);
                else if (method === 'PUT') newRouter.put(path, middlewares, callBackFunction);
                else if (method === 'DELETE') newRouter.delete(path, middlewares, callBackFunction);

                Swagger.addSingleApiPath(
                    this.data.tag, this.data.basePath, path, method as Methods,
                    currentMethod.swaggerParameters, currentMethod.swaggerBody, currentMethod.swaggerResponses
                )
            }
        }

        if (this.data.dbRouting)
        {
            const { entity, bodyParameters, getParameters, primaryKey } = this.data.dbRouting;
            DynamicDbRouter.addDbRouterSwagger({
                entity, bodyParameters, getParameters, primaryKey,
                router:newRouter, basePath:this.data.basePath, tag:this.data.tag, avoid:this.data.dbRouting.avoid,
                secure: this.data.dbRouting?.secure
            })
        }

        return newRouter;
    }

    public static setAuthApi = async (req:Request, res:Response) =>
    {
        try
        {
            const userjwt = await Token.authorize(req);
            const user = await User.findOne({ where: { id: userjwt.id }});
            if (!user) throw new Error('Unauthorized');

            const image = await Minio.getProfilePic(user.id);
            const newToken = await Token.generateJWE({ id: user.id });
            res.status(200).json({
                token:newToken,
                info:{ name: user.name, email: user.email, image }
            });
        }
        catch (err)
        {
            res.status(401).send(err);
        }
    }
}
