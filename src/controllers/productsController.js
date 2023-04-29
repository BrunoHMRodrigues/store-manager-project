const { productsService } = require('../services');
const {
  NOT_FOUND,
  // NAME_INVALID,
  NAME_REQUIRED,
  NOT_FOUND_MSG,
  // NAME_INVALID_MSG,
  NAME_REQUIRED_MSG } = require('../utils/status');

const getAll = async (req, res) => {
  const result = await productsService.getAll();
  return res.status(200).json(result.message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getProductById(id);
  if (result.type !== null) return res.status(NOT_FOUND).json({ message: NOT_FOUND_MSG });
  return res.status(200).json(result.message);
};

const editProductById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) return res.status(NAME_REQUIRED).json({ message: NAME_REQUIRED_MSG });

  const result = await productsService.editProductById({ id, name });

  if (result.type !== null) return res.status(result.type).json({ message: result.message });

  return res.status(200).json(result.message);
};

const createProduct = async (req, res) => {
  const productData = req.body;
  if (!productData.name) return res.status(NAME_REQUIRED).json({ message: NAME_REQUIRED_MSG });
  const result = await productsService.createProduct(productData);
  if (result.type !== null) return res.status(result.type).json({ message: result.message });

  return res.status(201).json(result.message);
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;

  const result = await productsService.deleteProductById(id);
  console.log('controller', result);
  if (result.type !== null) return res.status(NOT_FOUND).json({ message: NOT_FOUND_MSG });

  return res.status(204).json({});
};

module.exports = { getAll, getProductById, createProduct, editProductById, deleteProductById };