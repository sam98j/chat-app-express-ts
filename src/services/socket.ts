import {Server as SocketServer, Socket} from 'socket.io';
import SocketHandlers from '../handlers/sockets';
import UserService from './users';

export function Socket_IO(io: SocketServer){
    io.on('connect', async (socket: Socket) => {
        // current user conected to the socket
        const current_user_id = socket.handshake.query._id as string;
        // user services
        const {updateSocketId, setOnline} = new UserService();
        // socket events handlers
        const {newMessage, disconnect} = SocketHandlers(socket, current_user_id)
        // set online on database
        await setOnline({cUser_id: current_user_id, online: true})
        // user going online
        socket.broadcast.emit('friend_going_online', {user_id: current_user_id})
        // update socket_id with same user_id
        await updateSocketId(current_user_id, socket.id)
        // on recive message
        socket.on('message', newMessage);
        // on client disconnectd
        socket.on("disconnect", disconnect)
    })
}