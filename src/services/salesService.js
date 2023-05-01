const { salesModel } = require('../models');
const { SALE_NOT_FOUND, SALE_NOT_FOUND_MSG } = require('../utils/status');
const { validateQuantity, validateProductId } = require('./validations/salesValidation');

const getAll = async () => {
  const result = await salesModel.getAll();
  return { type: null, message: result };
};

const getSaleById = async (saleId) => {
  const result = await salesModel.getSaleById(saleId);
  if (result.length < 1) return { type: SALE_NOT_FOUND, message: SALE_NOT_FOUND_MSG };
  return { type: null, message: result };
};

const createSale = async (salesData) => {
  // Percorrer todos os itens do array. O resultado é um array de mesmo tamanho que o salesData onde cada item será o primeiro caso inválido entre quantity ou o productId ou será null.
  const validations = await Promise.all(salesData.map(async (sale) => {
    const quantityValidation = validateQuantity(sale);
    if (quantityValidation.type !== null) {
      return { type: quantityValidation.type, message: quantityValidation.message };
    }
    const productIdValidation = await validateProductId(sale);
    if (productIdValidation.type !== null) {
      return { type: productIdValidation.type, message: productIdValidation.message };
    }
    return { type: null };
  }));
  // Procura a primeira ocorrência de um caso inválido no array criado com as validações. Caso encontre algum ele é retornado. Caso contrário ele continuará para o o createSale.
  const getValidation = validations.find((validation) => validation.type !== null);
  if (getValidation) return { type: getValidation.type, message: getValidation.message };
  const saleId = await salesModel.createSale();
  salesData.forEach((saleData) => salesModel.createSaleProduct(saleId, saleData));
  const result = { id: saleId, itemsSold: salesData };
  return { type: null, message: result };
};

const deleteSaleById = async (saleId) => {
  const result = await salesModel.getSaleById(saleId);
  console.log('resultado se existe', result);
  if (result.length < 1) return { type: SALE_NOT_FOUND, message: SALE_NOT_FOUND_MSG };

  await salesModel.deleteSaleById(saleId);

  await salesModel.deleteSaleProductsById(saleId);

  return { type: null };
};

module.exports = { createSale, getAll, getSaleById, deleteSaleById };