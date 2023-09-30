import { getDataById, getAllData, getDataByUserId, createTransaction } from "../repositories/transactions.js";
import { getDataById as getDataProductById } from "../repositories/products.js";
import { successResponse, errorResponse } from "../utils/response.js";

const getAllTransactions = async (req, res, next) => {
 try {
  const [transactions] = await getAllData();
  successResponse(res, 'Success', transactions);
 } catch (error) {
  next(error);
 }
};

const getTransactionById = async (req, res, next) => {
 try {
  const { id } = req.params;
  const [transaction] = await getDataById(id);

  if (!transaction) {
   return errorResponse(res, 'Transaction Not Found', 'Transaction with the provided ID does not exist.', 404);
  }

  successResponse(res, 'Success', ...transaction);
 } catch (error) {
  next(error);
 }
};

const getTransactionsByUserId = async (req, res, next) => {
 try {
  const userId = req.userData.id;
  const [transactions] = await getDataByUserId(userId);

  if (!transactions || transactions.length === 0) {
   return errorResponse(res, 'No Transactions Found', 'There are no transactions for this user.', 404);
  }

  successResponse(res, 'Success', transactions);
 } catch (error) {
  next(error);
 }
};

const createDataTransaction = async (req, res, next) => {
 const userId = req.userData.id;
 const { productId, quantity } = req.body;

 try {
  if (!userId) {
   return errorResponse(res, 'Authorization Failed', 'You are not authorized to access this resource.', 401);
  }

  const [product] = await getDataProductById(productId);
  if (!product) {
   return errorResponse(res, 'Product Not Found', 'The selected product does not exist.', 404);
  }


  const { name, price } = product[0];
  console.log(name, price, "PRoduct");
  console.log(userId, "userId");
  console.log(req.body, "req.body");

  if (isNaN(quantity) || quantity <= 0) {
   return errorResponse(res, 'Invalid Quantity', 'Quantity should be a positive number.', 400);
  }

  const totalPrice = quantity * price;

  const [transaction] = await createTransaction(userId, productId, quantity, totalPrice);
  const [dataTransaction] = await getDataById(transaction.insertId);
  console.log(dataTransaction, "dataTransaction");
  const result = dataTransaction[0];
  console.log(result, "result");

  if (!result || !result.id) {
   return errorResponse(res, 'Transaction Failed', 'Failed to create the transaction.', 500);
  }

  successResponse(res, 'Transaction Created Successfully', {
   transactionId: result.id,
   name,
   price,
   quantity,
   totalPrice
  });
 } catch (error) {
  next(error);
 }
};

export {
 getAllTransactions,
 getTransactionById,
 getTransactionsByUserId,
 createDataTransaction
}