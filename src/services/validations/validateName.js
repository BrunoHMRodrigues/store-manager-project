const { NAME_INVALID, NAME_INVALID_MSG } = require('../../utils/status');

const validateName = async (productData) => {
  if (productData.name.length < 5) {
    return {
      type: NAME_INVALID,
      message: NAME_INVALID_MSG,
    };
  }
  return { type: null };
};

module.exports = { validateName };