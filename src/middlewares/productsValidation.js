const validateNameCreateProduct = async (req, res, next) => {
  const productData = req.body;
  if (!productData.name) return res.status(400).json({ message: '"name" is required' })
  next();
};

module.exports = { validateNameCreateProduct };