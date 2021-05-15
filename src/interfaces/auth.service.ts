export interface UserCredentials {
    username: string,
    password: string
}
// login success
export interface LoginSuccess {
    token: string;
    username: string
}