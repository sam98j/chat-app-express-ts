declare namespace Express {
    export interface Request {
        currentUser: {username: string}
    }
}