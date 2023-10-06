const chai = require('chai');
const sinon = require('sinon');

const { productsFromDB, productFromDB } = require('../mocks/product.mock');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');

const { expect } = chai;

describe('Realizando teste - Product Service', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recupera todos os produtos com sucesso', async function () {
    sinon.stub(productModel, 'findAll').resolves(productsFromDB);

    const { status, data } = await productService.listAll();

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.instanceOf(Array);
    expect(data).to.have.length(2);
  });
  it('Recupera um produto pelo ID com sucesso', async function () {
    sinon.stub(productModel, 'findById').resolves(productFromDB);

    const PRODUCT_ID = productFromDB.id;
    const PRODUCT_NAME = productFromDB.name;

    const { status, data } = await productService.findOne(PRODUCT_ID);

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.instanceOf(Object);
    expect(data.name).to.be.equal(PRODUCT_NAME);
  });
  it('Não recupera um produto pelo ID com id inexistente', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);

    const NON_EXISTENT_PRODUCT_ID = 9999;

    const { status, data } = await productService.findOne(NON_EXISTENT_PRODUCT_ID);

    expect(status).to.be.equal('NOT_FOUND');
    expect(data).to.haveOwnProperty('message');
    expect(data.message).to.be.equal('Product not found');
  });
  it('Cria um produto com sucesso', async function () {
    sinon.stub(productModel, 'insert').resolves(productFromDB);

    const productData = {
      name: productFromDB.name,
    };

    const { status, data } = await productService.create(productData);

    expect(status).to.be.equal('CREATED');
    expect(data).to.haveOwnProperty('id');
    expect(data.name).to.be.equal(productData.name);
  });
  it('Não cria um produto passando dados inválidos', async function () {
    sinon.stub(productModel, 'insert').resolves();

    const INVALID_PRODUCT_NAME = 'abc';

    const productData = {
      name: INVALID_PRODUCT_NAME,
    };

    const { status, data } = await productService.create(productData);

    expect(status).to.be.equal('INVALID_VALUES');
    expect(data).to.haveOwnProperty('message');
  });
});