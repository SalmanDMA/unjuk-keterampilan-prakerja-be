import db from '../utils/db.js';

const getAllData = () => {
 const query = 'SELECT * FROM products';
 return db.query(query);
}

const getDataById = (id) => {
 const query = 'SELECT * FROM products WHERE id = ?';
 return db.query(query, [id]);
}

const createData = (name, price, description) => {
 const created_at = new Date();
 const query = 'INSERT INTO products (name, price, description, created_at) VALUES (?, ?, ?, ?)';
 return db.query(query, [name, price, description, created_at]);
}

const updateData = (id, name, price, description) => {
 const updated_at = new Date();
 const query = 'UPDATE products SET name = ?, price = ?, description = ?, updated_at = ? WHERE id = ?';
 return db.query(query, [name, price, description, updated_at, id]);
}

const deleteData = (id) => {
 const query = 'DELETE FROM products WHERE id = ?';
 return db.query(query, [id]);
}

export {
 getAllData,
 getDataById,
 createData,
 updateData,
 deleteData
}