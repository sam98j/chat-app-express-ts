import { Request, Response } from "express";
import UserService from "../services/users";
const {getUsrById} = new UserService()

interface getPchatDataBody {
    recUserId: string
}

interface pChatDataRes {
    recId: string;
    avatar: string;
    username: string,
    messages: []
}

export default class DataController {
    // private chat data handler
    async pChatDataHandler(req: Request, res: Response){
        const {recUserId} = req.body as getPchatDataBody;
        // if an issue in recUserId
        if(recUserId === undefined || recUserId === "") {
            res.status(400).end()
        }
        // get reciver data
        try {
            const recUser = await getUsrById(recUserId);
            if(recUser) {
                const resObj: pChatDataRes = {
                    recId: recUser._id,
                    avatar: "",
                    username: recUser.username,
                    messages: []
                }
                // send data to the client
                res.status(200).send(resObj)
            } else {
                res.status(400).send({
                    msg: "user not found"
                })
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }
}