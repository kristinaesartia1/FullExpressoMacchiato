import { compareSync, hashSync } from "bcrypt";
import multer from "multer";
import { Equal } from "typeorm";
import { apiNok, apiOk } from "../_super_express/_utils";
import { RouterWrapper } from "../_super_express/RouterWrapper";
import { Swagger } from "../_super_express/Swagger";
import { Token } from "../_super_express/Token";
import { User } from "../db/models/user.model";
import { Minio } from "../utils/minio.utils";

const upload = multer({ storage: multer.memoryStorage() })


export const userRouter = new RouterWrapper({
    tag:'user',
    basePath:'/api/user',
    swaggerNewSchemas:
    {
        'user-login': Swagger.createSchema({ email:'string', password:'string' }),
        'user-signin': Swagger.createSchema({ name:'string', email:'string', password:'string' }),
        'user-update': Swagger.createSchema({ name:'string', email:'string', image: Swagger.createMultipartSchema('image') }),
        'change-pass': Swagger.createSchema({ currentPassword:'string', newPassword:'string' })
    },
    apis:
    {
        "/login":
        {
            'POST':
            {
                swaggerBody: { schema:'user-login' },
                handler: async (req, res) =>
                {
                    const { email, password } = req.body;

                    const user = await User.findOneBy({ email:Equal(email) })
                    if (!user) return apiNok("Wrong Credentials", 401);

                    const passwordMatch = compareSync(password, user.password);
                    if (!passwordMatch) return apiNok("Wrong Credentials", 401);

                    const token = await Token.generateJWE({ id: user.id });
                    const image = await Minio.getProfilePic(user.id);
                    return apiOk({
                        token,
                        info:{ name: user.name, email: user.email, image }
                    })
                }
            }

        },
        "/signin":
        {
            'POST':
            {
                swaggerBody: { schema:'user-signin' },
                handler: async (req, res) =>
                {
                    const { name, email, password } = req.body;

                    const user = await User.create({ name, email, password }).save();

                    const token = await Token.generateJWE({ id: user.id });
                    const image = await Minio.getProfilePic(user.id);
                    return apiOk({
                        token,
                        info:{ name: user.name, email: user.email, image }
                    })
                }
            }
        },
        '/':
        {
            'POST':
            {
                swaggerBody: { schema: 'user-update' },
                middlewares: [upload.single('image')],
                handler: async (req) =>
                {
                    const payload = await Token.authorize(req);
                    const { id } = payload;
                    const { name } = req.body

                    const user = await User.findOne({ where: { id }});
                    if (!user) throw new Error('User not found');

                    user.name = name;
                    await user.save();

                    const fileBuffer = req.file?.buffer ?? null;
                    if (fileBuffer) await Minio.putObject(Minio.profilePicBucket, `${id}.png`, fileBuffer);

                    return apiOk({ email:user.email, name, image: fileBuffer?.toString('base64') ?? null });
                }
            }
        },
        '/updatePassword':
        {
            'POST':
            {
                swaggerBody: { schema: 'change-pass' },
                handler: async (req) =>
                {
                    const payload = await Token.authorize(req);
                    const { id } = payload;
                    const { currentPassword, newPassword } = req.body

                    const user = await User.findOne({ where: { id }});
                    if (!user) throw new Error('User not found');

                    const passwordMatch = compareSync(currentPassword, user.password);
                    if (!passwordMatch) return apiNok("Wrong Credentials", 401);

                    const hash = hashSync(newPassword, 10);
                    user.password = hash
                    await user.save();

                    return apiOk(true);
                }
            }
        }
    }
});
