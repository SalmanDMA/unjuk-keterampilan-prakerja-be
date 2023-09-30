import db from '../utils/db.js';

const getAllData = () => {
 const query = 'SELECT * FROM transactions';
 return db.query(query);
}

const getDataById = (id) => {
 const query = 'SELECT * FROM transactions WHERE id = ?';
 return db.query(query, [id]);
}

const getDataByUserId = (userId) => {
 const query = 'SELECT * FROM transactions WHERE user_id = ?';
 return db.query(query, [userId]);
}

const createTransaction = (userId, productId, quantity, totalPrice) => {
 console.log(userId, productId, quantity, totalPrice, "from database");
 const createdAt = new Date();
 const query = 'INSERT INTO transactions (user_id, product_id, quantity, total_price, created_at) VALUES (?, ?, ?, ?, ?)';
 return db.query(query, [userId, productId, quantity, totalPrice, createdAt]);
}

export {
 getAllData,
 getDataById,
 getDataByUserId,
 createTransaction,
};
