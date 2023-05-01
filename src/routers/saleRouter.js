const express = require('express');

const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesController.getAll);

router.get('/:id', salesController.getSaleById);

router.delete('/:id', salesController.deleteSaleById);

router.post('/', salesController.createSale);

module.exports = router;