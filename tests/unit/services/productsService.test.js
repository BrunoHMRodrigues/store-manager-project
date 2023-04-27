const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { validateName } = require('../../../src/services/validations/validateName');
const { NAME_INVALID, NAME_INVALID_MSG } = require('../../../src/utils/status');

const {
  // mockGetAllProducts,
  successAllProducts,
  mockGetProduct,
  successGetProduct,
  // mockFailProduct,
  successCreateProduct
} = require('../mock/productsMock');

afterEach(() => sinon.restore());

describe('Testing Service from Products', function () {
  describe('Cases of success', function () {
    const resultSuccessGetAll = { type: null, message: successAllProducts };
    it('getAll existing data', async function () {
      // sinon.stub(productsModel, 'getAll').resolves(resultSuccessGetAll);
      sinon.stub(productsModel, 'getAll').resolves(successAllProducts);

      const result = await productsService.getAll();

      expect(result).to.contains.keys(['type', 'message']);
      expect(result).to.be.deep.equal(resultSuccessGetAll);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.an('array')
      expect(result.message).to.be.deep.equal(successAllProducts);
    });

    const resultSuccessGetProduct = { type: null, message: successGetProduct };
    it('getProductById existing id', async function () {
      // sinon.stub(productsModel, 'getProductById').resolves(resultSuccessGetProduct);
      sinon.stub(productsModel, 'getProductById').resolves(successGetProduct);

      const result = await productsService.getProductById(1);

      expect(result).to.contains.keys(['type', 'message']);
      // expect(result).to.be.deep.equal(resultSuccessGetProduct);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.equal(successGetProduct);
    });

    const productData = { "name": "xablau" };
    const newProduct = { "id": 4, "name": "xablau" };
    const resultSuccessCreateProduct = { type: null, message: newProduct };

    it('createProduct success creating product', async function () {
      sinon.stub(productsModel, 'createProduct').resolves(newProduct);

      const result = await productsService.createProduct(productData);

      expect(result).to.contains.keys(['type', 'message']);
      // expect(result).to.be.equal(resultSuccessCreateProduct);
      expect(result.type).to.be.equal(null);
      expect(result).to.be.deep.equal(resultSuccessCreateProduct);
      // expect(result.type).to.be.equal(null);
      // expect(result.message).to.contains.keys(['id', 'name']);
    });
  });

  describe('Cases of failure', function () {
    const productData = { "name": "bad" };
    const newProduct = { "id": 4, "name": "bad" };
    // const resultSuccessCreateProduct = { type: null, message: newProduct };

    const resultFailValidateName = {
      type: NAME_INVALID,
      // status: 422,
      message: NAME_INVALID_MSG,
    };

    it('length of the name of the product lower than 5', async function () {
      // sinon.stub(productsModel, 'createProduct').resolves(resultSuccessCreateProduct);
      sinon.stub(productsModel, 'createProduct').resolves(newProduct);

      const result = await productsService.createProduct(productData);

      // expect(result).to.contains.keys(['type', 'status', 'message']);
      // expect(result).to.be.deep.equal(resultFailValidateName);
      expect(result).to.contains.keys(['type', 'message']);
      expect(result).to.be.deep.equal(resultFailValidateName);
      // expect(result.type).to.be.equal(NAME_INVALID);
      // expect(result.message).to.be.deep.equal(NAME_INVALID_MSG);
    });
  });
});