const { salesService } = require('../services');
const { validateData } = require('./validation/validateData');

const createSale = async (req, res) => {
  const saleData = req.body;
  for (let index = 0; index < saleData.length; index += 1) {
    const dataValidation = validateData(saleData[index]);
    if (dataValidation.type !== null) {
      return res.status(dataValidation.type).json({ message: dataValidation.message });
    }
  }

  const result = await salesService.createSale(saleData);
  if (result.type !== null) return res.status(result.type).json({ message: result.message });

  return res.status(201).json(result.message);
};

module.exports = { createSale };