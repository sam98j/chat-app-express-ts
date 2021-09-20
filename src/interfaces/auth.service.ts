export interface UserCredentials {
    username: string,
    password: string
}
// login success
export interface LoginSuccess {
    token: string;
    user: {
        username: string,
        _id: string
    }
}