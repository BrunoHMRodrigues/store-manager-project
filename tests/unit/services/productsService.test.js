const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { validateName } = require('../../../src/services/validations/validateName');
const { NAME_INVALID, NAME_INVALID_MSG, NOT_FOUND, NOT_FOUND_MSG } = require('../../../src/utils/status');

const {
  successAllProducts,
  successGetProduct,
  failGetInexistentProduct,
} = require('../utils/productsHelper');

const {
  mockGetProduct,
  mockFailProduct,
} = require('../mock/productsMock');

afterEach(() => sinon.restore());

describe('Testing Service from Products', function () {
  describe('Cases of success', function () {
    const resultSuccessGetAll = { type: null, message: successAllProducts };
    it('getAll existing data', async function () {
      sinon.stub(productsModel, 'getAll').resolves(successAllProducts);

      const result = await productsService.getAll();

      expect(result).to.contains.keys(['type', 'message']);
      expect(result).to.be.deep.equal(resultSuccessGetAll);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.an('array')
      expect(result.message).to.be.deep.equal(successAllProducts);
    });

    // const resultSuccessGetProduct = { type: null, message: successGetProduct };
    it('getProductById existing id', async function () {
      // sinon.stub(productsModel, 'getProductById').resolves(resultSuccessGetProduct);
      sinon.stub(productsModel, 'getProductById').resolves(successGetProduct);

      const result = await productsService.getProductById(1);

      expect(result).to.contains.keys(['type', 'message']);
      // expect(result).to.be.deep.equal(resultSuccessGetProduct);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.equal(successGetProduct);
    });

    it('editProductById existing id', async function () {
      const id = 1;
      const name = 'Martelo do Batman';
      sinon.stub(productsModel, 'editProductById').resolves();

      const result = await productsService.editProductById({ id, name });

      expect(result).to.contains.keys(['type', 'message']);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal({ id: 1, name: 'Martelo do Batman' });
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

    it('deleteProductById success delete', async function () {
      const id = 2;
      sinon.stub(productsModel, 'deleteProductById').resolves();
      // sinon.stub(salesModel, 'deleteSaleProductsById').resolves();

      const result = await productsService.deleteProductById(id);

      expect(result.type).to.be.deep.equal(null);
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

    it('product id doesn"t exist', async function () {
      // sinon.stub(productsModel, 'createProduct').resolves(resultSuccessCreateProduct);
      sinon.stub(productsModel, 'getProductById').resolves(undefined);

      const result = await productsService.getProductById(999);

      // expect(result).to.contains.keys(['type', 'status', 'message']);
      // expect(result).to.be.deep.equal(resultFailValidateName);
      expect(result).to.contains.keys(['type', 'message']);
      expect(result.type).to.be.equal(NOT_FOUND);
      expect(result.message).to.be.equal(NOT_FOUND_MSG);
      expect(result).to.be.deep.equal(failGetInexistentProduct);
      // expect(result.type).to.be.equal(NAME_INVALID);
      // expect(result.message).to.be.deep.equal(NAME_INVALID_MSG);
    });

    it('editProductById id doesn"t exist', async function () {
      // sinon.stub(productsModel, 'getProductById').resolves(resultSuccessGetProduct);
      const id = 999;
      const name = 'Martelo do Batman';
      sinon.stub(productsModel, 'getProductById').resolves(undefined);

      const result = await productsService.editProductById({ id, name });

      expect(result).to.contains.keys(['type', 'message']);
      // expect(result).to.be.deep.equal(resultSuccessGetProduct);
      expect(result).to.be.deep.equal({ type: NOT_FOUND, message: NOT_FOUND_MSG });
    });

    it('editProductById length of the name of the product lower than 5', async function () {
      // sinon.stub(productsModel, 'getProductById').resolves(resultSuccessGetProduct);
      const id = 1;
      const name = 'bad';
      sinon.stub(productsModel, 'getProductById').resolves({ id, name });

      const result = await productsService.editProductById({ id, name });

      expect(result).to.contains.keys(['type', 'message']);
      // expect(result).to.be.deep.equal(resultSuccessGetProduct);
      expect(result).to.be.deep.equal({ type: NAME_INVALID, message: NAME_INVALID_MSG });
    });

    it('deleteProductById inexistent id', async function () {
      const id = 999;
      sinon.stub(productsModel, 'deleteProductById').resolves();
      // sinon.stub(productsModel, 'deleteSaleProductsById').resolves();

      const result = await productsService.deleteProductById(id);

      expect(result).to.be.deep.equal({ type: NOT_FOUND, message: NOT_FOUND_MSG });
    });
  });
});