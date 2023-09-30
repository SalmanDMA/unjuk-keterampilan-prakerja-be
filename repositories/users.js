import db from '../utils/db.js';

const getAllData = () => {
 const query = 'SELECT * FROM users';
 return db.query(query);
};

const getDataById = (id) => {
 const query = 'SELECT * FROM users WHERE id = ?';
 return db.query(query, [id]);
};

const createData = (name, email, password, role = 'user') => {
 const createdAt = new Date();
 const query = 'INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, ?)';
 return db.query(query, [name, email, password, role, createdAt]);
};

const updateData = (id, name, email, password) => {
 const updatedAt = new Date();

 const query = 'UPDATE users SET name = ?, email = ?, password = ?, updated_at = ? WHERE id = ?';
 return db.query(query, [name, email, password, updatedAt, id]);
};

const deleteData = (id) => {
 const query = 'DELETE FROM users WHERE id = ?';
 return db.query(query, [id]);
};

const getUserByEmail = (email) => {
 const query = 'SELECT id, name, email, password, role FROM users WHERE email = ?';
 return db.query(query, [email]);
};

export {
 getAllData,
 getDataById,
 createData,
 updateData,
 deleteData,
 getUserByEmail,
};
