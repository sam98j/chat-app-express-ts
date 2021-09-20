import { Message } from "./messages.service";

export interface getPchatDataBody {
    recUserId: string
}

export interface pChatDataRes {
    messages: Message[]
}