// routes/customerTypeRoutes.js
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/customerTypeController');

router.get('/',        ctrl.getAll);    // GET    /api/customer-type
router.get('/:id',     ctrl.getById);   // GET    /api/customer-type/:id
router.post('/',       ctrl.create);    // POST   /api/customer-type
router.put('/:id',     ctrl.update);    // PUT    /api/customer-type/:id
router.delete('/:id',  ctrl.remove);    // DELETE /api/customer-type/:id

module.exports = router;