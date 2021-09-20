import { Request, Response,  } from "express";
import { getPchatDataBody, pChatDataRes } from "../interfaces/pChat";
import MessageService from "../services/messages";
import UserService from "../services/users";
const {getUsrById} = new UserService()


export default class DataController {
    private static messages_service = new MessageService()
    // private chat data handler
    async pChatDataHandler(req: Request, res: Response){
        // query params
        const {recUserId} = req.body as getPchatDataBody;
        // current User _id
        const {_id} = req.currentUser;
        // const {recUserId} = req.query.foo;
        // if an issue in recUserId
        if(recUserId === undefined || recUserId === "") {
            res.status(400).end()
        }
        // get reciver data
        try {
            const recUser = await getUsrById(recUserId);
            const messages = await DataController.messages_service.getMessages({cUser: _id, chatting_with: recUserId})
            if(recUser && messages !== false) {
                const resObj: pChatDataRes = {
                    messages: [...messages]
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