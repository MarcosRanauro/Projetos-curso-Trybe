import { Request, Response } from 'express';
import orderService from '../services/order.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function findAll(_req: Request, res: Response) {
  const ServiceResponse = await orderService.findAll();

  const status = mapStatusHTTP(ServiceResponse.status);
  res.status(status).json(ServiceResponse.data);
}

export default {
  findAll,
};