const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

const {
  successAllProducts,
  successGetProduct,
} = require('../utils/productsHelper');

const {
  NAME_INVALID,
  NAME_INVALID_MSG,
  NAME_REQUIRED_MSG,
  NAME_REQUIRED,
  NOT_FOUND_MSG,
  NOT_FOUND } = require('../../../src/utils/status');

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

      await productsController.getAll(req, res);

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

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(successGetProduct);
    });

    it('editProductById existing id', async function () {
      const id = 1;
      const name = 'Martelo do Batman';
      const resultSuccessEdit = { type: null, message: { id, name } }
      sinon.stub(productsService, 'editProductById').resolves(resultSuccessEdit);

      const req = {
        params: { id },
        body: { name },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.editProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id, name });
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

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    });
  });

  describe('Cases of failure', function () {
    const failureGetProductById = {
      type: 'NOT_FOUND',
      status: 404,
      message: 'Product not found'
    }
    it('getProductById id searched doesn"t exist', async function () {
      sinon.stub(productsService, 'getProductById').resolves(failureGetProductById)

      const req = {
        params: { id: '999' },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const result = await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(NOT_FOUND);
      expect(res.json).to.have.been.calledWith({ message: NOT_FOUND_MSG});
    });

    it('length of the name of the created product is lower than 5', async function () {
      const productData = { "name": "bad" };
      const resultFailValidationName = {
        type: NAME_INVALID,
        // status: 422,
        message: NAME_INVALID_MSG,
      };
      
      sinon.stub(productsService, 'createProduct').resolves(resultFailValidationName);

      const req = {
        body: productData,
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const result = await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: NAME_INVALID_MSG });
    });

    it('product passed without name key', async function () {
      const productData = {};

      const req = {
        body: productData,
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(NAME_REQUIRED);
      expect(res.json).to.have.been.calledWith({ message: NAME_REQUIRED_MSG });
    });

    it('editProductById missing name', async function () {
      const id = 1;
      // const resultSuccessEdit = { type: null, message: { id, name } }
      // sinon.stub(productsService, 'editProductById').resolves(resultSuccessEdit);

      const req = {
        params: { id },
        body: {},
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.editProductById(req, res);

      expect(res.status).to.have.been.calledWith(NAME_REQUIRED);
      expect(res.json).to.have.been.calledWith({ message: NAME_REQUIRED_MSG });
    });
  });
});