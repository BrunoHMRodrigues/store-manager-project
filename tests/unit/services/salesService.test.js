const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { NAME_INVALID, NAME_INVALID_MSG, NOT_FOUND, NOT_FOUND_MSG, SALE_NOT_FOUND, SALE_NOT_FOUND_MSG, INVALID_QUANTITY, INVALID_QUANTITY_MSG, INVALID_PRODUCT_ID, INVALID_PRODUCT_ID_MSG } = require('../../../src/utils/status');
const { successGetAllSales, successGetById, successCreateSale } = require('../utils/salesHelper');

describe('Testing Service from Sales', function () {
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

  describe('Cases of success', function () {
    it('getAll existing data', async function () {
      sinon.stub(salesModel, 'getAll').resolves(successGetAllSales);

      const result = await salesService.getAll();

      expect(result).to.have.keys(['type', 'message']);
      expect(result).to.be.deep.equal({ type: null, message: successGetAllSales });
    });

    // const resultSuccessGetProduct = { type: null, message: successGetProduct };
    it('getSaleById existing id', async function () {
      sinon.stub(salesModel, 'getSaleById').resolves(successGetById);

      const result = await salesService.getSaleById(1);

      expect(result).to.have.keys(['type', 'message']);
      expect(result).to.be.deep.equal({ type: null, message: successGetById });
    });

    it('createSale success creating sale', async function () {
      const saleId = 3;
      sinon.stub(salesModel, 'createSale').resolves(saleId);

      const result = await salesService.createSale(salesData);

      expect(result).to.have.keys(['type', 'message']);
      expect(result).to.be.deep.equal({ type: null, message: successCreateSale });
    });
  });
  
  describe('Cases of failure', function () {
    it('getSaleById when id doesn"t exist', async function () {
      sinon.stub(salesModel, 'getSaleById').resolves([]);

      const result = await salesService.getSaleById(999);

      expect(result).to.have.keys(['type', 'message']);
      expect(result).to.be.deep.equal({ type: SALE_NOT_FOUND, message: SALE_NOT_FOUND_MSG });
    });

    const salesDataQuantityFailZero = [
      {
        "productId": 1,
        "quantity": 0
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]
    it('createSale fail when quantity equal to 0', async function () {
      const result = await salesService.createSale(salesDataQuantityFailZero);

      expect(result).to.have.keys(['type', 'message']);
      expect(result).to.be.deep.equal({ type: INVALID_QUANTITY, message: INVALID_QUANTITY_MSG });
    });

    const salesDataQuantityFailMenos = [
      {
        "productId": 1,
        "quantity": -1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]
    it('createSale fail when quantity equal below 0', async function () {
      const result = await salesService.createSale(salesDataQuantityFailMenos);

      expect(result).to.have.keys(['type', 'message']);
      expect(result).to.be.deep.equal({ type: INVALID_QUANTITY, message: INVALID_QUANTITY_MSG });
    });

    const salesDataProductInexistent = [
      {
        "productId": 999,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]
    it('createSale fail when productId doesn"t exist', async function () {
      const result = await salesService.createSale(salesDataProductInexistent);

      expect(result).to.have.keys(['type', 'message']);
      expect(result).to.be.deep.equal({ type: INVALID_PRODUCT_ID, message: INVALID_PRODUCT_ID_MSG });
    });
  });
});