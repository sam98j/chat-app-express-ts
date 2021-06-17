import JWT from 'jsonwebtoken'
import { LoginSuccess, UserCredentials } from '../interfaces/auth.service';
import { User } from '../interfaces/users.service';
import UserService from './users';
const {findUser} = new UserService()


export default class AuthService {
    // verify Token
    verifyToken(authorization: string | undefined): Promise<User>{
        // get the token
        const token = authorization ? authorization.split(" ")[1] : undefined;
        // 
        return new Promise((resolve, reject) => {
            if(token) {
                JWT.verify(token, process.env.TOKEN_SECRET!, (err: any, user: any) => {
                    // that's mean the token is not valid
                    if(err) {
                        const res = {
                            statusCode: 401,
                            data: "You'r not authorized cause your token isn't valid"
                        };
                        // reject the promise
                        reject(res)
                    }
                    // else that is mean the token verify is done 
                    resolve(user)
                })
            } else {
                const res = {
                    statusCode: 400,
                    data: "You don't have a token"
                };
                reject(res)
            }
        })
    }
    // login serive
    async login(credentials: UserCredentials): Promise<LoginSuccess | false>{
        try {
            const user = await findUser(credentials);
            // check if user is exitst
            if(user !== null) {
                const {username, _id} = user;
                // generate token for that user
                const token = JWT.sign({_id}, process.env.TOKEN_SECRET!);
                // response obj
                const res = {username, token, _id};
                return res
            } else { // user dosn't exist
                return false
            }
        } catch(error) {
            return error
        }
    }
}