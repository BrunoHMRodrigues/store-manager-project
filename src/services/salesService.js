const { salesModel } = require('../models');
const { validateQuantity, validateProductId } = require('./validations/salesValidation');

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
  if (getValidation) {
    return { type: getValidation.type, message: getValidation.message };
  }
  const result = await salesModel.createSale(salesData);

  return { type: null, message: result };
};

module.exports = { createSale };