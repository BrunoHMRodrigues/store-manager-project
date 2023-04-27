const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models/index');
const connection = require('../../../src/models/connection');

const {
  mockAllProducts,
  successMockProducts,
  mockProduct,
  successMockProduct,
  failMockProduct } = require('../mock/productsMock');

afterEach(() => sinon.restore());

describe('Testing Model from Products', function () {
  it('getAll existing data', async function () {
    sinon.stub(connection, 'execute').resolves(mockAllProducts);

    const products = await productsModel.getAll();

    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(successMockProducts);
  })

  it('getProductById existing id', async function () {
    sinon.stub(connection, 'execute').resolves(mockProduct);

    const product = await productsModel.getProductById(1);

    expect(product).to.be.contains.keys(['id', 'name']);
    expect(product).to.be.deep.equal(successMockProduct)
  })
})