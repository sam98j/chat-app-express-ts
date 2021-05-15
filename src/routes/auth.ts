import express from 'express';
import AuthController from '../controllers/auth';
import AuthMiddleware from '../middlewares/auth';
const authRouter = express.Router();
const {loginHandler, checkUserHandler} = new AuthController();
const {verifyUser} = new AuthMiddleware()

authRouter.post('/login', loginHandler);
authRouter.get('/check_user', verifyUser,checkUserHandler);

export default authRouter