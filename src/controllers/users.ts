import { Request, Response } from "express";
import UserService from "../services/users";
const {getUsers} = new UserService()

export default class UsersController {
    // get all users Handler
    async allUsersHandler(req: Request, res: Response){
        try {
            const users = await getUsers();
            res.status(200).send({users})
        } catch(err) {
            res.status(500).send(err)
        }
    }
}