const { salesService } = require('../services');

const createSale = async (req, res) => {
  const saleData = req.body;

  const result = await salesService.createSale(saleData);
  if (result.type !== null) return res.status(result.status).json({ message: result.message });

  return res.status(201).json(result.message);
};

module.exports = { createSale };