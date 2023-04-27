const { productsService } = require('../services');

const getAll = async (req, res) => {
  const result = await productsService.getAll();
  return res.status(200).json(result.message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getProductById(id);
  if (result.type !== null) return res.status(result.status).json({ message: result.message });
  return res.status(200).json(result.message);
};

const createProduct = async (req, res) => {
  const productData = req.body;
  const result = await productsService.createProduct(productData);
  if (result.type !== null) return res.status(result.status).json({ message: result.message });

  return res.status(201).json(result.message);
};

module.exports = { getAll, getProductById, createProduct };