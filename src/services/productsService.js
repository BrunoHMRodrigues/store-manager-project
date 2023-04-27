const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  return product;
};

const createProduct = async (productData) => {
  const product = await productsModel.createProduct(productData);
  return product;
};

module.exports = { getAll, getProductById, createProduct };