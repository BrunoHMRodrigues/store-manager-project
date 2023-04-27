const { expect } = require('chai');
const sinon = require('sinon');

const { productsService } = require('../../../src/services');
const connection = require('../../../src/models/connection');
const validateName = require('../../../src/services/validations/validateName');

const {
  mockGetAllProducts,
  successAllProducts,
  mockGetProduct,
  successGetProduct,
  mockFailProduct,
  successCreateProduct } = require('../mock/productsMock');

afterEach(() => sinon.restore());

describe('Testing Service from Products', function () {
  describe('Cases of success', function () {
    const resultSuccessGetAll = { type: null, message: successAllProducts };
    it('getAll existing data', async function () {
      sinon.stub(productsService, 'getAll').resolves(resultSuccessGetAll);

      const result = await productsService.getAll();

      expect(result).to.contains.keys(['type', 'message']);
      expect(result.message).to.be.an('array')
      expect(result).to.be.deep.equal(resultSuccessGetAll);
    });

    const resultSuccessGetProduct = { type: null, message: successGetProduct };
    it('getProductById existing id', async function () {
      sinon.stub(productsService, 'getProductById').resolves(resultSuccessGetProduct);

      const result = await productsService.getProductById(1);

      expect(result).to.contains.keys(['type', 'message']);
      expect(result).to.be.deep.equal(resultSuccessGetProduct);
    });

    const productData = { "name": "xablau" };
    const newProduct = { "id": 4, "name": "xablau" };
    const resultSuccessCreateProduct = { type: null, message: newProduct };

    it('createProduct success creating product', async function () {
      sinon.stub(productsService, 'createProduct').resolves(resultSuccessCreateProduct);

      const result = await productsService.createProduct(productData);

      expect(result).to.contains.keys(['type', 'message']);
      expect(result).to.be.deep.equal(resultSuccessCreateProduct);
      // expect(result.type).to.be.equal(null);
      // expect(result.message).to.contains.keys(['id', 'name']);
    });
  });

  describe('Cases of failure', function () {
    const productData = { "name": "bad" };

    const resultFailValidateName = {
      type: 'NAME_INVALID',
      status: 422,
      message: '"name" length must be at least 5 characters long',
    };

    // VERIFY HOW TO DO IT
    it('length of the name of the product lower than 5', async function () {
      sinon.stub(validateName).resolves(resultFailValidateName);

      const result = await productsService.createProduct(productData);

      expect(validateName.calledOnceWith(productData)).to.be.true;
      expect(result).to.contains.keys(['type', 'status', 'message']);
      expect(result).to.be.deep.equal(resultFailValidateName);
    });
  });
});