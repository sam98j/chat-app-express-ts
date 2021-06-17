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
}