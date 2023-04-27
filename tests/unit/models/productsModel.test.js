const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const {
  mockGetAllProducts,
  successAllProducts,
  mockGetProduct,
  successGetProduct,
  mockFailProduct,
  successCreateProduct } = require('../mock/productsMock');

afterEach(() => sinon.restore());

describe('Testing Model from Products', function () {
  describe('Cases of success', function () {
    it('getAll existing data', async function () {
      sinon.stub(connection, 'execute').resolves(mockGetAllProducts);
  
      const result = await productsModel.getAll();
  
      // expect(result).to.contains.keys(['type', 'message']);
      // expect(result.message).to.be.an('array');
      // expect(result.message).to.be.deep.equal(successAllProducts);
      expect(result).to.be.an('array');
      expect(result).to.be.deep.equal(successAllProducts);
    })
  
    it('getProductById existing id', async function () {
      sinon.stub(connection, 'execute').resolves(mockGetProduct);
  
      const result = await productsModel.getProductById(1);
  
      // expect(result).to.contains.keys(['type', 'message']);
      // expect(result.message).to.be.deep.equal(successGetProduct)
      // expect(result.type).to.be.equal(null);
      // expect(result.message).to.contains.keys(['id', 'name']);
      expect(result).to.contains.keys(['id', 'name']);
      expect(result).to.be.deep.equal(successGetProduct)
    })

    const productData = { "name": "xablau" };
    const newProduct = { "id": 4, "name": "xablau" };
    // const successNewProduct = { type: null, message: newProduct };
  
    it('createProduct success creating product', async function () {
      sinon.stub(connection, 'execute').resolves(successCreateProduct)

      const result = await productsModel.createProduct(productData);

      // expect(result).to.contains.keys(['type', 'message']);
      // expect(result).to.be.deep.equal(successNewProduct)
      // expect(result.type).to.be.equal(null);
      // expect(result.message).to.contains.keys(['id', 'name']);
      expect(result).to.contains.keys(['id', 'name']);
      expect(result).to.be.deep.equal(newProduct)
    });
  })

  describe('Cases of failure', function () {
    const resultFail = { type: 'NOT_FOUND', status: 404, message: 'Product not found' }
    it('Id searched doesn"t exists', async function () {
      sinon.stub(connection, 'execute').resolves(mockFailProduct);
  
      const result = await productsModel.getProductById(999);
  
      // expect(result).to.contains.keys(['type', 'status', 'message']);
      // expect(result).to.be.deep.equal(resultFail)
      // expect(result.type).to.be.equal('NOT_FOUND');
      // expect(result.status).to.be.equal(404);
      // expect(result.message).to.be.equal('Product not found');
      expect(result).to.be.deep.equal(undefined)
    });
  });
})