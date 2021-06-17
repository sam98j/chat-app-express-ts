import { Socket } from "socket.io";
import { Message } from "../interfaces/messages.service";
import UserService from "../services/users";

export default function SocketHandlers(socket: Socket) {
    const {getUsrById} = new UserService()
    // new message event handler
    async function newMessage(message: Message){
        const {reciver} = message;
        const user = await getUsrById(reciver)
        console.log(user?.socket_id)
        socket.to(user?.socket_id!).emit("message_res", {...message})
    }

    return {newMessage}
}