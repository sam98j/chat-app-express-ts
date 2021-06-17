import { Request, Response } from "express";
import { UserCredentials } from "../interfaces/auth.service";
import AuthService from "../services/auth";
import UserService from "../services/users";
const {login} = new AuthService()

export default class AuthController {
    private static user_service = new UserService();
    // login handler
    async loginHandler(req: Request, res: Response){
        // user login credentials
        const credentioals : UserCredentials = req.body;
        // try to resolve promise from login auth service
        try {
            const resObj = await login(credentioals);
            res.status(200).send(resObj)
        } catch(error) {
            res.status(500).send(error)
        }
    }
    // check user is Logged in handler
    async checkUserHandler(req: Request, res: Response){
        try {
            const user = await AuthController.user_service.getUsrById(req.currentUser._id!);
            // check if user is exit
            if(user !== null) {
                const {id, username} = user;
                res.status(200).send({id, username});
                return
            }
            res.status(401).send({err: "not authrized"})
        } catch(err) {
            res.status(500).send({err: "enternal server error"})
        }
    }
}