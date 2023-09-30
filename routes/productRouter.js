import express from 'express';
import {
 getProduct,
 getProductById,
 createProduct,
 updateProduct,
 deleteProduct,
} from '../service/product.js';
import { isAdmin, validateToken } from '../service/user.js';

const productRouter = express.Router();

productRouter.get('/', validateToken, getProduct);
productRouter.get('/:id', validateToken, getProductById);
productRouter.post('/', validateToken, isAdmin, createProduct);
productRouter.put('/:id', validateToken, isAdmin, updateProduct);
productRouter.delete('/:id', validateToken, isAdmin, deleteProduct);

export default productRouter; 