const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { productsFromDB, productFromDB } = require('../mocks/product.mock');
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');

const { expect } = chai;

describe('Realizando teste - Product Controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recupera todos os produtos com sucesso', async function () {
    sinon.stub(productService, 'listAll').resolves({
      status: 'SUCCESSFUL',
      data: productsFromDB,
    });

    const request = {};
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.listAll(request, response);

    expect(response.status).to.have.been.calledWith(200);
    expect(response.json).to.have.been.calledWith(productsFromDB);
  });
  it('Recupera um produto pelo ID com sucesso', async function () {
    sinon.stub(productService, 'findOne').resolves({
      status: 'SUCCESSFUL',
      data: productFromDB,
    });

    const PRODUCT_ID = productFromDB.id;

    const request = {
      params: {
        productId: PRODUCT_ID,
      },
    };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.findOne(request, response);

    expect(response.status).to.have.been.calledWith(200);
    expect(response.json).to.have.been.calledWith(productFromDB);
  });
  it('Cria um produto com sucesso', async function () {
    sinon.stub(productService, 'create').resolves({
      status: 'CREATED',
      data: productFromDB,
    });

    const requestData = {
      name: productFromDB.name,
    };

    const request = {
      body: requestData,
    };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.create(request, response);

    expect(response.status).to.have.been.calledWith(201);
    expect(response.json).to.have.been.calledWith(productFromDB);
  });
});