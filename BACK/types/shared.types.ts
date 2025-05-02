// --- API
export type UserLoginReturn = {
    token:string,
    info: {
        name: string,
        email: string,
        image: string
    }
}
