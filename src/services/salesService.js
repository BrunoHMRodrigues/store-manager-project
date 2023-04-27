const { salesModel } = require('../models');

const createSale = async (salesData) => {
  const result = await salesModel.createSale(salesData);

  // Acrescentar validações

  return { type: null, message: result };
};

module.exports = { createSale };