import { Request, Response } from 'express';
import productService from '../services/product.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function create(req: Request, res: Response) {
  const newProduct = req.body;
  const ServiceResponse = await productService.create(newProduct);

  const status = mapStatusHTTP(ServiceResponse.status);
  res.status(status).json(ServiceResponse.data);
}

async function findAll(_req: Request, res: Response) {
  const ServiceResponse = await productService.findAll();

  const status = mapStatusHTTP(ServiceResponse.status);
  res.status(status).json(ServiceResponse.data);
}

export default { create, findAll };
