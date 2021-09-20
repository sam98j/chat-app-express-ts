import { Socket } from "socket.io";
import { AddMessageRes } from "../constants/messages.service";
import { Message } from "../interfaces/messages.service";
import MessageService from "../services/messages";
import UserService from "../services/users";

export default function SocketHandlers(socket: Socket, cUser_id: string) {
    const {getUsrById, setOnline, setLastSeen} = new UserService();
    const {addMessage} = new MessageService();
    const {DONE, REJECT} = AddMessageRes;
    // new message event handler
    async function newMessage(message: Message){
        const {reciver} = message;
        try {
            // get reciver
            const user = await getUsrById(reciver)
            // add message database res
            const dbres = await addMessage(message);
            // check if message is rjected
            if(dbres === REJECT) {
                return false
            }
            socket.to(user?.socket_id!).emit("message_res", {...message})
            return true
        } catch(err) {return err}
    }
    // handle disconnect
    async function disconnect(data: any){
        console.log("client disconnected")
        try {
            await setOnline({cUser_id, online: false});
            await setLastSeen(cUser_id);
            const resData = {user_id: cUser_id};
            // send data to the client
            socket.broadcast.emit('friend_disconnected', resData);
        } catch(err) {return err}
    }

    return {newMessage, disconnect}
}