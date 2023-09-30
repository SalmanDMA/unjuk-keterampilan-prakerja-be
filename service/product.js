import { createData, deleteData, getAllData, getDataById, updateData } from '../repositories/products.js';
import { successResponse } from '../utils/response.js';

const createProduct = async (req, res, next) => {
 try {
  const { name, price, description } = req.body;
  const [created] = await createData(name, price, description);
  const [result] = await getDataById(created.insertId);
  successResponse(res, 'Product Created Successfully', result[0]);
 } catch (error) {
  next(error);
 }
}

const getProduct = async (req, res, next) => {
 try {
  const [data] = await getAllData();
  successResponse(res, 'Success', data);
 } catch (error) {
  next(error);
 }
}

const getProductById = async (req, res, next) => {
 try {
  const { id } = req.params;
  const [data] = await getDataById(id);
  successResponse(res, 'Success', ...data);
 } catch (error) {
  next(error);
 }
}

const updateProduct = async (req, res, next) => {
 try {
  const { id } = req.params;
  const { name, price, description } = req.body;
  await updateData(id, name, price, description);
  successResponse(res, 'Success', `Product with id ${id} has been updated.`);
 } catch (error) {
  next(error);
 }
}

const deleteProduct = async (req, res, next) => {
 try {
  const { id } = req.params;
  await deleteData(id);
  successResponse(res, 'Success', `Product with id ${id} has been deleted.`);
 } catch (error) {
  next(error);
 }
}

export {
 createProduct,
 getProduct,
 getProductById,
 updateProduct,
 deleteProduct
}