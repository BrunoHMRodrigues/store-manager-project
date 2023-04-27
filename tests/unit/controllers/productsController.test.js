// const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

// const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

const {
  // mockGetAllProducts,
  successAllProducts,
  // mockGetProduct,
  successGetProduct,
  // mockFailProduct,
  // successCreateProduct
} = require('../mock/productsMock');

afterEach(() => sinon.restore());

describe('Testing Controller from Products', function () {
  describe('Cases of success', function () {
    const resultSuccessGetAll = { type: null, message: successAllProducts };
    it('getAll existing data', async function () {
      sinon.stub(productsService, 'getAll').resolves(resultSuccessGetAll);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const result = await productsController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(successAllProducts);
    });

    const resultSuccessGetProduct = { type: null, message: successGetProduct };
    it('getProductById existing id', async function () {
      sinon.stub(productsService, 'getProductById').resolves(resultSuccessGetProduct);

      const req = {
        params: { id: '1' },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const result = await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(successGetProduct);
    });

    const productData = { "name": "xablau" };
    const newProduct = { "id": 4, "name": "xablau" };
    const resultSuccessCreateProduct = { type: null, message: newProduct };
    it('createProduct success creating product', async function () {
      sinon.stub(productsService, 'createProduct').resolves(resultSuccessCreateProduct);

      const req = {
        body: productData,
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const result = await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    });
  });
});