const express = require('express');
const { validateCreateProduct } = require('../middlewares/productsValidation');

const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.getAll);

router.get('/:id', productsController.getProductById);

router.post('/', validateCreateProduct, productsController.createProduct);

module.exports = router;