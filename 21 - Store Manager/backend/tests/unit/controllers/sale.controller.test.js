const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { saleService } = require('../../../src/services');
const { salesFromModel, saleFromModel, saleFromService } = require('../mocks/sale.mock');
const { saleController } = require('../../../src/controllers');

chai.use(sinonChai);

const { expect } = chai;

describe('Realizando teste - Sale Controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recupera todas as vendas com sucesso', async function () {
    sinon.stub(saleService, 'listAll').resolves({
      status: 'SUCCESSFUL',
      data: salesFromModel,
    });

    const responseData = Array.from(salesFromModel);

    const request = {};
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.listAll(request, response);

    expect(response.status).to.have.been.calledWith(200);
    expect(response.json).to.have.been.calledWith(responseData);
  });
  it('Recupera uma venda pelo ID com sucesso', async function () {
    sinon.stub(saleService, 'findOne').resolves({
      status: 'SUCCESSFUL',
      data: saleFromModel,
    });

    const SALE_ID = saleFromModel.saleId;

    const responseData = {
      ...saleFromModel,
    };

    const request = {
      params: {
        saleId: SALE_ID,
      },
    };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.findOne(request, response);

    expect(response.status).to.have.been.calledWith(200);
    expect(response.json).to.have.been.calledWith(responseData);
  });
  it('Cria uma venda com sucesso', async function () {
    sinon.stub(saleService, 'create').resolves({
      status: 'CREATED',
      data: saleFromService,
    });

    const saleData = saleFromService.itemsSold;

    const responseData = {
      ...saleFromService,
    };

    const request = {
       body: saleData,
    };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.create(request, response);

    expect(response.status).to.have.been.calledWith(201);
    expect(response.json).to.haveOwnProperty('id');
    expect(response.json).to.have.been.calledWith(responseData);
  });
});