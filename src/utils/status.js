const NAME_INVALID_MSG = '"name" length must be at least 5 characters long'; // 422
const NAME_REQUIRED_MSG = '"name" is required'; // 400

const NOT_FOUND = 404;
const NOT_FOUND_MSG = 'Product not found'; // 404
const NAME_INVALID = 422;
const NAME_REQUIRED = 400;

const PRODUCT_ID_REQUIRED = 400;
const PRODUCT_ID_REQUIRED_MSG = '"productId" is required';
const QUANTITY_REQUIRED = 400;
const QUANTITY_REQUIRED_MSG = '"quantity" is required';

const INVALID_QUANTITY = 422;
const INVALID_QUANTITY_MSG = '"quantity" must be greater than or equal to 1';
const INVALID_PRODUCT_ID = 404;
const INVALID_PRODUCT_ID_MSG = 'Product not found';

const SALE_NOT_FOUND = 404;
const SALE_NOT_FOUND_MSG = 'Sale not found';

module.exports = {
  NOT_FOUND,
  NAME_INVALID,
  NAME_REQUIRED,
  NOT_FOUND_MSG,
  NAME_INVALID_MSG,
  NAME_REQUIRED_MSG,
  PRODUCT_ID_REQUIRED,
  PRODUCT_ID_REQUIRED_MSG,
  QUANTITY_REQUIRED,
  QUANTITY_REQUIRED_MSG,
  INVALID_QUANTITY,
  INVALID_QUANTITY_MSG,
  INVALID_PRODUCT_ID,
  INVALID_PRODUCT_ID_MSG,
  SALE_NOT_FOUND,
  SALE_NOT_FOUND_MSG,
};