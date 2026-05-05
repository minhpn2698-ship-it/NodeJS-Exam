// controllers/customerTypeController.js
const db = require('../config/db');

// GET all customer types
const getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM customer_type ORDER BY id ASC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET customer type by ID
const getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM customer_type WHERE id = ?', [req.params.id]);
    if (rows.length === 0)
      return res.status(404).json({ success: false, message: 'Customer type not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST insert customer type
const create = async (req, res) => {
  try {
    const { type_name, description } = req.body;
    if (!type_name)
      return res.status(400).json({ success: false, message: 'type_name is required' });

    const [result] = await db.query(
      'INSERT INTO customer_type (type_name, description) VALUES (?, ?)',
      [type_name, description || null]
    );
    res.status(201).json({ success: true, message: 'Created successfully', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT update customer type
const update = async (req, res) => {
  try {
    const { type_name, description } = req.body;
    const [result] = await db.query(
      'UPDATE customer_type SET type_name = ?, description = ? WHERE id = ?',
      [type_name, description || null, req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Customer type not found' });
    res.json({ success: true, message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE customer type by id
const remove = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM customer_type WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Customer type not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };