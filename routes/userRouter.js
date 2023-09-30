import express from 'express';
import {
 getUser,
 getUserById,
 createUser,
 updateUser,
 deleteUser,
 authUser,
 validateToken,
} from '../service/user.js';

const userRouter = express.Router();

userRouter.get('/', getUser);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);
userRouter.put('/:id', validateToken, updateUser);
userRouter.delete('/:id', validateToken, deleteUser);
userRouter.post('/auth', authUser);

export default userRouter;
