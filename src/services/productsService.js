const { productsModel } = require('../models');
const { NOT_FOUND, NOT_FOUND_MSG } = require('../utils/status');
const { validateName } = require('./validations/validateName');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { type: null, message: products };
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  if (!product) return { type: NOT_FOUND, message: NOT_FOUND_MSG };
  return { type: null, message: product };
};

const createProduct = async (productData) => {
  const validate = await validateName(productData);
  if (validate.type !== null) return validate;
  const product = await productsModel.createProduct(productData);
  return { type: null, message: product };
};

module.exports = { getAll, getProductById, createProduct };