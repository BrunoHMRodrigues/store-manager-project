const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { successCreateSale } = require('../utils/salesHelper')

const {} = require('../mock/salesMock')

afterEach(() => sinon.restore());

describe('Testing Model from Sales', function () {
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
    ]
    const newsale = { 'sale_id': 3, 'product_id': 1, 'quantity': 1 };
    // const successNewProduct = { type: null, message: newProduct };
  
    it('createProduct success creating product', async function () {
      // sinon.stub(connection, 'execute')
      //   .onCall(0).resolves({ insertId: 3 })
      //   .onCall(1).resolves({ affectedRows: 1 })
      //   .onCall(2).resolves({ affectedRows: 1 });
      sinon.stub(connection, 'execute')
        .onFirstCall().resolves({ insertId: 3 })
        .onSecondCall().resolves({ insertId: 3 })
        .onThirdCall().resolves({ insertId: 3 })

      const result = await salesModel.createSale(saleData);

      expect(result).to.contains.keys(['id', 'itemsSold']);
      expect(result.itemsSold).to.have.length(2);
      expect(result).to.be.deep.equal(successCreateSale);
    });
  })
});
