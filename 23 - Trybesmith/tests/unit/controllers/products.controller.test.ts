import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productService from '../../../src/services/product.service';
import productController from '../../../src/controllers/product.controller';
import productMock from '../../mocks/product.mock';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { Product } from '../../../src/types/Product';
import ProductModel, { ProductSequelizeModel } from '../../../src/database/models/product.model';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  describe('post /products', function () {
    it('Retorno CREATED e criação de produto.', async function () {
      req.body = productMock.newProduct;
      const serviceResponse: ServiceResponse<Product> = {
        status: 'CREATED',
        data: productMock.returnedProduct,
      };
      sinon.stub(productService, 'create').resolves(serviceResponse);
      await productController.create(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productMock.returnedProduct);

    });   
  });
  describe('get /products', function () {
    it('Retorna SUCCESSFUL e todos os produtos.', async function () {
      const productsArray = ProductModel.build(productMock.returnedProduct);
      const serviceResponse: ServiceResponse<ProductSequelizeModel[]> = {
        status: 'SUCCESSFUL',
        data: [productsArray],
      };
      sinon.stub(productService, 'findAll').resolves(serviceResponse);

      await productController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([productsArray]);

    });   
  });

  describe('Product Controller', function () {
    const req = {} as Request;
    const res: Partial<Response> = {};
  
    beforeEach(function () {
      sinon.restore();
    });
  
    describe('create', function () {
      it('should create a new product', async function () {
        const { newProduct, returnedProduct } = productMock;
  
        sinon.stub(productService, 'create').resolves({
          status: 'CREATED',
          data: returnedProduct,
        });
  
        req.body = newProduct;
  
        const statusStub = sinon.stub();
        const jsonStub = sinon.stub();
        (res as Response).status = statusStub;
        (res as Response).json = jsonStub;
  
        statusStub.returnsThis();
        jsonStub.returns({});
  
        await productController.create(req, res as Response);
  
        expect(statusStub.calledWith(201)).to.be.true;
        expect(jsonStub.calledWith(returnedProduct)).to.be.true;
      });
    });
  
    describe('findAll', function () {
      it('should return all products', async function () {
        const { returnedProduct } = productMock;
        const serviceResponse: ServiceResponse<ProductSequelizeModel[]> = {
          status: 'SUCCESSFUL',
          data: [returnedProduct as unknown as ProductSequelizeModel],
        };
      
        sinon.stub(productService, 'findAll').resolves(serviceResponse);
      
        const statusStub = sinon.stub();
        const jsonStub = sinon.stub();
        const res = {
          status: statusStub,
          json: jsonStub,
        } as unknown as Response;
      
        statusStub.returnsThis();
        jsonStub.returns({});
      
        await productController.findAll(req, res);
      
        expect(statusStub.calledWith(200)).to.be.true;
        expect(jsonStub.calledWith([returnedProduct])).to.be.true;
      });
    });
  });
});