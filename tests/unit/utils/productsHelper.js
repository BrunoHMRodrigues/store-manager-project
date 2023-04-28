const { NOT_FOUND, NOT_FOUND_MSG } = require("../../../src/utils/status");

const successAllProducts = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
]

const successGetProduct = {
  "id": 1,
  "name": "Martelo de Thor"
}

const failGetInexistentProduct = { type: NOT_FOUND, message: NOT_FOUND_MSG }

module.exports = {
  successAllProducts,
  successGetProduct,
  failGetInexistentProduct
};