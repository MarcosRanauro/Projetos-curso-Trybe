const chai = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productsFromDB, productFromDB, nextProductId } = require('../mocks/product.mock');
const { productModel } = require('../../../src/models');

const { expect } = chai;

describe('Realizando teste - Product Model', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recupera todos os produtos com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const products = await productModel.findAll();

    expect(products).to.be.instanceOf(Array);
    expect(products).to.have.length(2);
  });
  it('Recupera um produto pelo ID com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);

    const PRODUCT_ID = productFromDB.id;
    const PRODUCT_NAME = productFromDB.name;

    const product = await productModel.findById(PRODUCT_ID);

    expect(product).to.be.instanceOf(Object);
    expect(product.name).to.be.equal(PRODUCT_NAME);
  });
  it('Cria um produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([nextProductId]);

    const productData = {
      name: 'Product Test',
    };

    const productId = await productModel.insert(productData);

    expect(productId).to.be.equal(nextProductId.insertId);
  });
});