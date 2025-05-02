import { RouterWrapper } from "../_super_express/RouterWrapper";
import { Swagger } from "../_super_express/Swagger";
import { Note } from "../db/models/notes.model";


export const noteRoutes = new RouterWrapper({
    tag:'note',
    basePath:'/api/note',
    dbRouting:
    {
        entity: Note,
        secure: { user_id: { tokenKey: 'id', methods: ['LIST', 'GET', 'POST', 'PUT', 'DELETE'] } },
        bodyParameters: { note: Swagger.createSchema({ content: { type: 'string' } }) },
    }
});
