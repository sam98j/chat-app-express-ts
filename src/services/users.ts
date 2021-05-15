import { UserCredentials } from '../interfaces/auth.service';
import { User } from '../interfaces/users.service';
import UsersModel from '../models/users'

export default class UserService {
    // get all Users
    async getUsers(): Promise<User[]>{
        // waitng for db to get all users
        try {
            const users = await UsersModel.find({});
            return users
        } catch(err) {
            return err
        }
    }
    // find User
    async findUser(credentials: UserCredentials): Promise<User | undefined>{
        // try to resolve promise from db
        try {
            // get the user form db
            const users = await UsersModel.find(credentials);
            // return the user;
            return users[0] 
        } catch(error) { // connect to database faild and then the promise rejected
            // return rejection
            return error
        }
    }
}