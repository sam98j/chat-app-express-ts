import {Router} from 'express';
import UsersController from '../controllers/users';
const usersRouter = Router();
const {allUsersHandler} = new UsersController()

usersRouter.get('/all_users', allUsersHandler);

export default usersRouter;