const {
  PRODUCT_ID_REQUIRED,
  PRODUCT_ID_REQUIRED_MSG,
  QUANTITY_REQUIRED,
  QUANTITY_REQUIRED_MSG } = require('../../utils/status');

const validateData = async (saleData) => {
  if (saleData.productId === undefined) {
    return { type: PRODUCT_ID_REQUIRED, message: PRODUCT_ID_REQUIRED_MSG };
  }
  if (saleData.quantity === undefined) {
    return { type: QUANTITY_REQUIRED, message: QUANTITY_REQUIRED_MSG };
  }
  return { type: null };
};

module.exports = { validateData };