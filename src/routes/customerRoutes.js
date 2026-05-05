// routes/customerRoutes.js
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/customerController');

router.get('/search',  ctrl.search);    // GET    /api/customers/search?q=keyword  ← PHẢI trước /:id
router.get('/',        ctrl.getAll);    // GET    /api/customers
router.get('/:id',     ctrl.getById);   // GET    /api/customers/:id
router.post('/',       ctrl.create);    // POST   /api/customers
router.put('/:id',     ctrl.update);    // PUT    /api/customers/:id
router.delete('/:id',  ctrl.remove);    // DELETE /api/customers/:id

module.exports = router;