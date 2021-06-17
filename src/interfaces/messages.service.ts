import { Document } from "mongoose";

export interface Message extends Document {
    _id: string;
    body: string;
    reciver: string;
    sender: string
}