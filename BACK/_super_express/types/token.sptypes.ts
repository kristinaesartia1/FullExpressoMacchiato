import { Methods } from "./generic.sptypes"

export type TokenPayload = { id: string, [key:string]:any }

export type SecureTokenConfig = boolean | { [columnName:string]:{
    tokenKey:string,
    methods:"*" | Array<Methods | "LIST">
} }
