import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import orderService from '../../../src/services/order.service';
import { ORDER, ORDER_WITH_PRODUCTS } from '../../mocks/order.mock';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });

  describe('get /orders', function () {
    it(' retorna status 200 e todos os produtos', async function () {
      const mockOrder = [OrderModel.build(ORDER)];
      sinon.stub(OrderModel, 'findAll').resolves(mockOrder);

      const serviceResponse = await orderService.findAll();

      expect(serviceResponse.status).to.equal('SUCCESSFUL');
      expect(serviceResponse.data).to.deep.equal(ORDER_WITH_PRODUCTS);
    });
  })

});
