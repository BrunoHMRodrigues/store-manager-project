const validateCreateProduct = async (req, res, next) => {
  const productData = req.body;
  if (!productData.name) return res.status(400).json({ message: '"name" is required' })
  if (productData.name.length < 5) return res.status(422).json({ message: '"name" length must be at least 5 characters long' })
  next();
};

module.exports = { validateCreateProduct };