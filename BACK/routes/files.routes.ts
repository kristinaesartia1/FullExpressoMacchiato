
import multer from "multer";
import { apiOk } from "../_super_express/_utils";
import { RouterWrapper } from "../_super_express/RouterWrapper";
import { Swagger } from "../_super_express/Swagger";

const upload = multer({ storage: multer.memoryStorage() })

export const fileRouter = new RouterWrapper({
    tag:'file',
    basePath:'/api/file',
    swaggerNewSchemas: { 'file-schema': Swagger.createMultipartSchema('file') },
    apis:
    {
        '/test':
        {
            "POST":
            {
                middlewares: [upload.single('file')],
                swaggerBody: { schema: 'file-schema', comType: 'multipart/form-data' },
                swaggerMultipartForm:true,
                handler: async (req, res) =>
                {
                    console.log(req.file)
                    return apiOk('wow');
                },
            }
        },
    }
})
