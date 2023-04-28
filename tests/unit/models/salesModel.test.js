const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

afterEach(() => sinon.restore());

describe('Testing Model from Products', function () {
  describe('Cases of success', function () {
    const saleData = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ];
    const newsale = { 'sale_id': 3, 'product_id': 1, 'quantity': 1 };
    // const successNewProduct = { type: null, message: newProduct };
  
    it('createProduct success creating product', async function () {
      sinon.stub(connection, 'execute').resolves(successCreateSale)

      const result = await productsModel.createProduct(newsale);

      // expect(result).to.contains.keys(['type', 'message']);
      // expect(result).to.be.deep.equal(successNewProduct)
      // expect(result.type).to.be.equal(null);
      // expect(result.message).to.contains.keys(['id', 'name']);
      expect(result).to.contains.keys(['id', 'name']);
      expect(result).to.be.deep.equal(newProduct)
    });
  })
});
