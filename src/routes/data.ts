import {Router} from 'express';
import DataController from '../controllers/data';
import AuthMiddleware from '../middlewares/auth';
const dataRouter = Router();
const {pChatDataHandler} = new DataController()
const {verifyUser} = new AuthMiddleware()

dataRouter.post('/private_chat_data', verifyUser, pChatDataHandler);
// export router
export default dataRouter;