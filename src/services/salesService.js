const { salesModel } = require('../models');
const { validateQuantity, validateProductId } = require('./validations/salesValidation');

const createSale = async (salesData) => {
  for (const sale of salesData) {
    const quantityValidation = await validateQuantity(sale);
    if (quantityValidation.type !== null) return {
      type: quantityValidation.type,
      message: quantityValidation.message,
    };

    const productIdValidation = await validateProductId(sale);
    if (productIdValidation.type !== null) return {
      type: productIdValidation.type,
      message: productIdValidation.message,
    };
  }

  const result = await salesModel.createSale(salesData);

  return { type: null, message: result };
};

module.exports = { createSale };