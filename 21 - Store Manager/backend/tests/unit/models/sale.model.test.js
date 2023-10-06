const chai = require('chai');
const sinon = require('sinon');
const camelize = require('camelize');

const connection = require('../../../src/models/connection');
const { saleModel } = require('../../../src/models');
const { salesFromDB, saleFromDB, nextSaleId } = require('../mocks/sale.mock');

const { expect } = chai;

describe('Realizando teste - Sale Model', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recupera todas as vendas com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);

    const sales = await saleModel.findAll();

    const responseData = camelize(salesFromDB);

    expect(sales).to.be.instanceOf(Array);
    expect(sales).to.have.length(2);
    expect(sales).to.be.deep.equal(responseData);
  });
  it('Recupera venda pelo ID com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromDB]);

    const SALE_ID = saleFromDB.sale_id;

    const sale = await saleModel.findById(SALE_ID);

    expect(sale).to.be.instanceOf(Object);
    expect(sale).to.haveOwnProperty('saleId');
    expect(sale.saleId).to.be.equal(SALE_ID);
  });
  it('Cria venda com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([nextSaleId]);

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

    const saleId = await saleModel.insert(saleData);

    expect(saleId).to.be.equal(nextSaleId.insertId);
  });
});