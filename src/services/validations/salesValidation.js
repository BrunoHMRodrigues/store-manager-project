const { productsModel } = require('../../models');
const {
  INVALID_QUANTITY,
  INVALID_QUANTITY_MSG,
  INVALID_PRODUCT_ID,
  INVALID_PRODUCT_ID_MSG,
} = require('../../utils/status');

const validateQuantity = (saleData) => {
  if (saleData.quantity < 1) {
    return { type: INVALID_QUANTITY, message: INVALID_QUANTITY_MSG };
  }
  return { type: null };
};

const validateProductId = async (saleData) => {
  const product = await productsModel.getProductById(saleData.productId);
  if (!product) return { type: INVALID_PRODUCT_ID, message: INVALID_PRODUCT_ID_MSG };
  return { type: null };
};

module.exports = { validateQuantity, validateProductId };