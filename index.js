import express from 'express';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import transactionRouter from './routes/transactionRouter.js';

const app = express();
const port = 8080;
const host = "localhost";
app.use(express.json());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use('/transactions', transactionRouter);

app.listen(port, host, () => {
 console.log(`Server running at http://${host}:${port}`);
})