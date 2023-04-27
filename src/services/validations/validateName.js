const validateName = async (productData) => {
  if (productData.name.length < 5) return { type: 'NAME_INVALID', status: 422, message: '"name" length must be at least 5 characters long' }
  return { type: null };
};

module.exports = { validateName };