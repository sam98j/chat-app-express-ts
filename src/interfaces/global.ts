import { Socket } from "socket.io";

export interface PromiseReje {
    statusCode: number,
    error: any
}

export class Extra extends Socket {
    cUser: any = ''
}