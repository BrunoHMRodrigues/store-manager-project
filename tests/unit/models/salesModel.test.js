const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { successCreateSale, successGetAllSales, successGetById } = require('../utils/salesHelper')

const { mockCreateSale, mockGetAll, mockGetById } = require('../mock/salesMock')

afterEach(() => sinon.restore());

describe('Testing Model from Sales', function () {
  describe('Cases of success', function () {
    const salesData = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]

    const saleData = {
        "productId": 1,
        "quantity": 1
    }

    it('getAll existing data', async function () {
      sinon.stub(connection, 'execute').resolves(mockGetAll);

      const result = await salesModel.getAll();

      expect(result).to.be.an('array');
      expect(result).to.have.length(3);
      expect(result).to.be.deep.equal(successGetAllSales);
    });

    it('getSaleById existing id', async function () {
      sinon.stub(connection, 'execute').resolves(mockGetById);

      const result = await salesModel.getSaleById(saleData);

      expect(result).to.be.an('array');
      expect(result).to.have.length(2);
      expect(result).to.be.deep.equal(successGetById);
    });

    // const newsale = { 'sale_id': 3, 'product_id': 1, 'quantity': 1 };
  
    it('createProduct success creating product', async function () {
      sinon.stub(connection, 'execute').resolves(mockCreateSale)

      const saleId = await salesModel.createSale();

      expect(saleId).to.be.equal(3);
    });
  })
});
