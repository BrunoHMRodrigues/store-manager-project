const { productsModel } = require('../models');
const { validateName } = require('./validations/validateName');

const getAll = async () => {
  const result = await productsModel.getAll();
  return result;
};

const getProductById = async (id) => {
  const result = await productsModel.getProductById(id);
  return result;
};

const createProduct = async (productData) => {
  const validate = await validateName(productData);
  if (validate.type !== null) return validate;
  const result = await productsModel.createProduct(productData);
  return result;
};

module.exports = { getAll, getProductById, createProduct };