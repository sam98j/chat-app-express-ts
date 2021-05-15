import { Request, Response } from "express";
import { UserCredentials } from "../interfaces/auth.service";
import AuthService from "../services/auth";
const {login} = new AuthService()

export default class AuthController {
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
    checkUserHandler(req: Request, res: Response){
        res.status(200).send(req.currentUser)
    }
}