import { createData, deleteData, getDataById, getAllData, updateData, getUserByEmail } from '../repositories/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { successResponse, errorResponse } from '../utils/response.js';

// Konstanta untuk secret key dan refresh token
const ACCESS_TOKEN_SECRET = 'tokoOnlineMantap123';
const REFRESH_TOKEN_SECRET = 'tokoKuatMahir';

const getUser = async (req, res, next) => {
 try {
  const [data] = await getAllData();
  successResponse(res, 'Success', data);
 } catch (error) {
  next(error);
 }
};

const getUserById = async (req, res, next) => {
 try {
  const { id } = req.params;
  const [data] = await getDataById(id);
  successResponse(res, 'Success', ...data);
 } catch (error) {
  next(error);
 }
}

const createUser = async (req, res, next) => {
 try {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const [created] = await createData(name, email, hashedPassword, role);
  const [result] = await getDataById(created.insertId);
  successResponse(res, 'User Created Successfully', result[0]);
 } catch (error) {
  next(error);
 }
};

const updateUser = async (req, res, next) => {
 try {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await updateData(id, name, email, hashedPassword);
  successResponse(res, 'Success', `User with id ${id} has been updated.`);
 } catch (error) {
  next(error);
 }
};

const deleteUser = async (req, res, next) => {
 try {
  const { id } = req.params;
  await deleteData(id);
  successResponse(res, 'Success', `User with id ${id} has been deleted.`);
 } catch (error) {
  next(error);
 }
};

const authUser = async (req, res, next) => {
 try {
  const { email, password } = req.body;
  const [result] = await getUserByEmail(email);
  const user = result[0];

  if (!user) {
   return errorResponse(res, 'Authentication Failed', 'Invalid email or password.', 401);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
   return errorResponse(res, 'Authentication Failed', 'Invalid email or password.', 401);
  }

  const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

  successResponse(res, 'Authentication Successful', { accessToken, refreshToken });
 } catch (error) {
  next(error);
 }
};

const validateToken = async (req, res, next) => {
 const token = req.headers.authorization.split(' ')[1];
 if (!token) {
  return errorResponse(res, 'Authorization Failed', 'Token is missing.', 401);
 }

 try {
  const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
  const userIdFromToken = decodedToken.id;
  const [userId] = await getDataById(userIdFromToken);

  if (userIdFromToken !== userId[0].id) {
   return errorResponse(res, 'Authorization Failed', 'You are not authorized to access this resource.', 403);
  }


  req.userData = decodedToken;
  next();
 } catch (error) {
  return errorResponse(res, 'Authorization Failed', 'Invalid token.', 401);
 }
};

const isAdmin = (req, res, next) => {
 const { role } = req.userData;
 if (role !== 'admin') {
  return errorResponse(res, 'Authorization Failed', 'You are not authorized to access this resource.', 403);
 }
 next();
}


export {
 getUser,
 getUserById,
 createUser,
 updateUser,
 deleteUser,
 authUser,
 validateToken,
 isAdmin
};
