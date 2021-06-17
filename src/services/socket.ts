import {Server as SocketServer, Socket} from 'socket.io';
import SocketHandlers from '../handlers/sockets';
import UserService from './users';

export function Socket_IO(io: SocketServer){
    io.on('connect', async (socket: Socket) => {
        // user services
        const {updateSocketId, getUsrById} = new UserService();
        // socket events handlers
        const {newMessage} = SocketHandlers(socket)
        // current user conected to the socket
        const current_user_id = socket.handshake.query._id as string;
        // update socket_id with same user_id
        await updateSocketId(current_user_id, socket.id)
        // on recive message
        socket.on('message', newMessage);
    })
}