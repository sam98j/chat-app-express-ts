import {Message} from '../interfaces/messages.service'
import mongoose from 'mongoose';
// create User Schema
const MessageSchema = new mongoose.Schema({
    body: String,
    reciver: String,
    sender: String
})
// 
const MessagesModel: mongoose.Model<Message> = mongoose.model('messages', MessageSchema);
// export model
export default MessagesModel