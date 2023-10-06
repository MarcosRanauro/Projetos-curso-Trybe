const chai = require('chai');
const sinon = require('sinon');

const { saleModel, productModel } = require('../../../src/models');
const { salesFromModel, saleFromModel, nextSaleId } = require('../mocks/sale.mock');
const { saleService } = require('../../../src/services');
const { productsFromDB } = require('../mocks/product.mock');

const { expect } = chai;

describe('Realizando teste - Sale Service', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recupera todos as vendas com sucesso', async function () {
    sinon.stub(saleModel, 'findAll').resolves(salesFromModel);

    const { data, status } = await saleService.listAll();

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.instanceOf(Array);
    expect(data).to.have.length(2);
  });
  it('Recupera venda pelo ID com sucesso', async function () {
    sinon.stub(saleModel, 'findById').resolves(saleFromModel);

    const SALE_ID = saleFromModel.saleId;

    const responseData = {
      ...saleFromModel,
    };

    const { status, data } = await saleService.findOne(SALE_ID);

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.instanceOf(Object);
    expect(data).to.be.deep.equal(responseData);
  });
  it('Não recupera venda pelo ID com saleId inexistente', async function () {
    sinon.stub(saleModel, 'findById').resolves([]);

    const NON_EXISTENT_SALE_ID = 9999;

    const { status, data } = await saleService.findOne(NON_EXISTENT_SALE_ID);

    expect(status).to.be.equal('NOT_FOUND');
    expect(data).to.haveOwnProperty('message');
    expect(data.message).to.be.equal('Sale not found');
  });
  it('Cria venda com sucesso', async function () {
    const saleData = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    sinon.stub(productModel, 'findById')
      .onFirstCall()
      .resolves(productsFromDB[0])
      .onSecondCall()
      .resolves(productsFromDB[1]);
    sinon.stub(saleModel, 'insert').resolves(nextSaleId.insertId);

    const SALE_ID = nextSaleId.insertId;

    const responseData = {
      id: SALE_ID,
      itemsSold: saleData,
    };

    const { status, data } = await saleService.create(saleData);

    expect(status).to.be.equal('CREATED');
    expect(data).to.be.instanceOf(Object);
    expect(data).to.haveOwnProperty('id');
    expect(data).to.be.deep.equal(responseData);
  });
});