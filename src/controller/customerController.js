// controllers/customerController.js
const db = require('../config/db');

// GET all customers (JOIN với customer_type để lấy type_name)
const getAll = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.*, ct.type_name
      FROM customer c
      LEFT JOIN customer_type ct ON c.customer_type_id = ct.id
      ORDER BY c.id ASC
    `);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET customer by ID
const getById = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.*, ct.type_name
      FROM customer c
      LEFT JOIN customer_type ct ON c.customer_type_id = ct.id
      WHERE c.id = ?
    `, [req.params.id]);
    if (rows.length === 0)
      return res.status(404).json({ success: false, message: 'Customer not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST insert customer
const create = async (req, res) => {
  try {
    const { customer_name, email, phone, address, customer_type_id } = req.body;
    if (!customer_name || !email)
      return res.status(400).json({ success: false, message: 'customer_name and email are required' });

    const [result] = await db.query(
      'INSERT INTO customer (customer_name, email, phone, address, customer_type_id) VALUES (?, ?, ?, ?, ?)',
      [customer_name, email, phone || null, address || null, customer_type_id || null]
    );
    res.status(201).json({ success: true, message: 'Created successfully', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT update customer
const update = async (req, res) => {
  try {
    const { customer_name, email, phone, address, customer_type_id } = req.body;
    const [result] = await db.query(
      'UPDATE customer SET customer_name=?, email=?, phone=?, address=?, customer_type_id=? WHERE id=?',
      [customer_name, email, phone || null, address || null, customer_type_id || null, req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Customer not found' });
    res.json({ success: true, message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE customer by id
const remove = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM customer WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Customer not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// SEARCH by customer_name, email, type_name
// GET /api/customers/search?q=keyword
const search = async (req, res) => {
  try {
    const keyword = `%${req.query.q || ''}%`;
    const [rows] = await db.query(`
      SELECT c.*, ct.type_name
      FROM customer c
      LEFT JOIN customer_type ct ON c.customer_type_id = ct.id
      WHERE c.customer_name LIKE ?
         OR c.email         LIKE ?
         OR ct.type_name    LIKE ?
      ORDER BY c.id ASC
    `, [keyword, keyword, keyword]);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove, search };