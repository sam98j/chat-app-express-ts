import { Document } from "mongoose";

export interface User extends Document {
    _id: string,
    username: string,
    password: string,
    socket_id: string,
    online: boolean,
    last_seen: string
}