import express from 'express';
import { validateToken, isAdmin } from '../service/user.js';
import {
 getAllTransactions,
 getTransactionById,
 createDataTransaction,
 getTransactionsByUserId,
} from '../service/transaction.js';

const transactionRouter = express.Router();

transactionRouter.get('/', validateToken, isAdmin, getAllTransactions);
transactionRouter.get('/:id', validateToken, getTransactionById);
transactionRouter.post('/', validateToken, createDataTransaction);
transactionRouter.get('/users/:userId', validateToken, getTransactionsByUserId);

export default transactionRouter;