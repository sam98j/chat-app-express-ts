import { NextFunction, Request, Response } from "express";
import { User } from "../interfaces/users.service";
import AuthService from "../services/auth";
const {verifyToken} = new AuthService()

export default class AuthMiddleware {
    // 
    async verifyUser(req: Request, res: Response, next: NextFunction){
        try {
            const {_id} = await verifyToken(req.headers.authorization);
            req.currentUser = {_id};
            next()
        } catch(error) {
            res.status(400).send(error)
        }
    }
}