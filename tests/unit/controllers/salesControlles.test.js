const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

const {
  successCreateSale,
  successGetAllSales,
  successGetById
} = require('../utils/salesHelper');

const {
  NAME_INVALID,
  NAME_INVALID_MSG,
  NAME_REQUIRED_MSG,
  NAME_REQUIRED,
  NOT_FOUND_MSG,
  NOT_FOUND, 
  SALE_NOT_FOUND,
  SALE_NOT_FOUND_MSG,
  PRODUCT_ID_REQUIRED,
  PRODUCT_ID_REQUIRED_MSG,
  QUANTITY_REQUIRED,
  QUANTITY_REQUIRED_MSG} = require('../../../src/utils/status');

afterEach(() => sinon.restore());

describe('Testing Controller from Sales', function () {
  describe('Cases of success', function () {
    const resultSuccessGetAll = { type: null, message: successGetAllSales };
    it('getAll existing data', async function () {
      sinon.stub(salesService, 'getAll').resolves(resultSuccessGetAll);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(successGetAllSales);
    });

    const resultSuccessGetSale = { type: null, message: successGetById };
    it('getSaleById existing id', async function () {
      sinon.stub(salesService, 'getSaleById').resolves(resultSuccessGetSale);

      const req = {
        params: { id: '1' },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(successGetById);
    });

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
    const resultSuccessCreateProduct = { type: null, message: successCreateSale };
    it('createSale success creating sale', async function () {
      sinon.stub(salesService, 'createSale').resolves(resultSuccessCreateProduct);

      const req = {
        body: salesData,
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(successCreateSale);
    });
  });

  describe('Cases of failure', function () {
    const resultFailIdInexistent = { type: SALE_NOT_FOUND, message: SALE_NOT_FOUND_MSG };
    it('getSaleById id searched doesn"t exist', async function () {
      sinon.stub(salesService, 'getSaleById').resolves(resultFailIdInexistent)

      const req = {
        params: { id: '999' },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const result = await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(SALE_NOT_FOUND);
      expect(res.json).to.have.been.calledWith({ message: SALE_NOT_FOUND_MSG });
    });

    const salesDataNoProductId = [
      {
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]

    // const resultFailCreateSaleNoProductId = { type: SALE_NOT_FOUND, message: SALE_NOT_FOUND_MSG };
    it('createSale missing productId', async function () {
      // sinon.stub(salesService, 'createSale').resolves(resultFailCreateSaleNoProductId);
      const req = {
        body: salesDataNoProductId,
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(PRODUCT_ID_REQUIRED);
      expect(res.json).to.have.been.calledWith({ message: PRODUCT_ID_REQUIRED_MSG });
    });

    const salesDataNoQuantity = [
      {
        "productId": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]

    // const resultFailCreateSaleNoProductId = { type: SALE_NOT_FOUND, message: SALE_NOT_FOUND_MSG };
    it('createSale missing quantity', async function () {
      // sinon.stub(salesService, 'createSale').resolves(resultFailCreateSaleNoProductId);
      const req = {
        body: salesDataNoQuantity,
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(QUANTITY_REQUIRED);
      expect(res.json).to.have.been.calledWith( { message: QUANTITY_REQUIRED_MSG });
    });

    // it('length of the name of the created product is lower than 5', async function () {
    //   const productData = { "name": "bad" };
    //   const resultFailValidationName = {
    //     type: NAME_INVALID,
    //     // status: 422,
    //     message: NAME_INVALID_MSG,
    //   };
      
    //   sinon.stub(salesService, 'createProduct').resolves(resultFailValidationName);

    //   const req = {
    //     body: productData,
    //   };
    //   const res = {};

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   const result = await productsController.createProduct(req, res);

    //   expect(res.status).to.have.been.calledWith(422);
    //   expect(res.json).to.have.been.calledWith({ message: NAME_INVALID_MSG });
    // });

    // it('product passed without name key', async function () {
    //   const productData = {};

    //   const req = {
    //     body: productData,
    //   };
    //   const res = {};

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   await productsController.createProduct(req, res);

    //   expect(res.status).to.have.been.calledWith(NAME_REQUIRED);
    //   expect(res.json).to.have.been.calledWith({ message: NAME_REQUIRED_MSG });
    // });
  });
});