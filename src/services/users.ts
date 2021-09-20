import { UserCredentials } from '../interfaces/auth.service';
import { User } from '../interfaces/users.service';
import UsersModel from '../models/users';
import moment from 'moment';

export default class UserService {
    // get all Users
    async getUsers(cUser_id: string): Promise<User[]>{
        // waitng for db to get all users
        try {
            const all_users = await UsersModel.find({});
            // get all users 
            const users = all_users.filter((user) => cUser_id !== user.id);
            return users
        } catch(err) {
            return err
        }
    }
    // find User
    async findUser(credentials: UserCredentials): Promise<User | null>{
        // try to resolve promise from db
        try {
            // get the user form db
            const user = await UsersModel.findOne(credentials);
            // return the user;
            return user
        } catch(error) { // connect to database faild and then the promise rejected
            // return rejection
            return error
        }
    }
    // get user by id
    async getUsrById(_id: string): Promise<User | null>{
        try {
            const user = await UsersModel.findOne({_id});
            return user
        } catch(err) {
            return err
        }
    }
    // update current user socket_id
    async updateSocketId(user_id: string, socket_id: string): Promise<true>{
        try {
            await UsersModel.updateOne({_id: user_id}, {$set: {socket_id: socket_id}});
            return true
        } catch(err) {
            return err
        }
    }
    // set the user online
    async setOnline(data: {cUser_id: string, online: boolean}): Promise<true>{
        const {cUser_id, online} = data;
        try {
            await UsersModel.updateOne({_id: cUser_id}, {$set: {online: online}});
            return true
        } catch(err) {return err}
    }
    // set the user last seen
    async setLastSeen(cUser_id: string): Promise<true>{
        const last_seen_date = moment().format();
        try {
            await UsersModel.updateOne({_id: cUser_id}, {$set: {last_seen: last_seen_date}});
            return true
        } catch(err) {return err}
    }
}