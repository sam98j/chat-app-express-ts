import {Router} from 'express';
import DataController from '../controllers/data';
const dataRouter = Router();
const {pChatDataHandler} = new DataController()

dataRouter.post('/private_chat_data', pChatDataHandler);
// export router
export default dataRouter;