import {Server as SocketServer, Socket} from 'socket.io'

export function Socket_IO(io: SocketServer){
    io.on('connect', (socket: Socket) => {
        console.log(socket.id)
    })
}