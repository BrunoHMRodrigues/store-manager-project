const express = require('express');
const { validateNameCreateProduct } = require('../middlewares/productsValidation');

const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.getAll);

router.get('/:id', productsController.getProductById);

router.post('/', validateNameCreateProduct, productsController.createProduct);

module.exports = router;