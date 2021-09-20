import { Message } from '../interfaces/messages.service'
import MessagesModel from '../models/messages';
import {AddMessageRes} from '../constants/messages.service'

export default class MessageService {
    // add message to db;
    async addMessage(message: Message): Promise<AddMessageRes.DONE | AddMessageRes.REJECT> {
        const {DONE, REJECT} = AddMessageRes;
        // 
        // check if an error in message
        if(message.body === undefined || message.sender === undefined || message.reciver === undefined) {
            return REJECT
        }
        if(message.body === '' || message.sender === '' || message.reciver === '') {
            return REJECT
        }
        try {
            await MessagesModel.insertMany([message]);
            return DONE
        } catch(err) {
            return err
        }
    }
    // get messages related to the user chatting with
    async getMessages(data: {chatting_with: string, cUser: string}): Promise<false | Message[] >{
        const {cUser, chatting_with} = data
        // check if paramter is not undefined
        if(chatting_with === undefined || cUser === '') {
            return false
        }
        // try to get the data
        try {
            // get filtered messages
            const messages = await MessagesModel.find({$or: [{$and: [{reciver: cUser}, {sender: chatting_with}]}, {$and: [{sender: cUser}, {reciver: chatting_with}]}]})
            return messages
        } catch(err){return err}
    }
}