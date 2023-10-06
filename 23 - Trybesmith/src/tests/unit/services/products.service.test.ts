import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import ProductService from '../../../src/services/product.service';
import productMock from '../../mocks/product.mock';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  describe('post /products', function () {
    it('Retorno CREATED e criação do produto.', async function () {
      const mockCreateReturn = ProductModel.build(productMock.returnedProduct);
      sinon.stub(ProductModel, 'create').resolves(mockCreateReturn)

      const serviceResponse = await ProductService.create(productMock.newProduct);
      expect(serviceResponse.status).to.equal('CREATED');
      expect(serviceResponse.data).to.deep.equal(productMock.returnedProduct);
    });
  })
  describe('get /products', function () {
    it('Retorno SUCCESSFUL e todos produtos.', async function () {
      const mockFindAllReturn = [ProductModel.build(productMock.returnedProduct)];
      sinon.stub(ProductModel, 'findAll').resolves(mockFindAllReturn)

      const serviceResponse = await ProductService.findAll();
      expect(serviceResponse.status).to.equal('SUCCESSFUL');
      expect(serviceResponse.data).to.deep.equal(mockFindAllReturn);
    });
  })
});