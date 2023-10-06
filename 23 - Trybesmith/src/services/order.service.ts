import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { Order } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';

async function getProducts(orderId: number): Promise<number[]> {
  const products = await ProductModel.findAll();
  const productIds: number[] = products
    .filter((product) => {
      const orderIdProduct = product.getDataValue('orderId');
      return orderIdProduct === orderId;
    })
    .map((product) => product.getDataValue('id'));

  return productIds;
}

async function findAll(): Promise<ServiceResponse<Order[]>> {
  const orders = await OrderModel.findAll<OrderSequelizeModel>();

  const ordersWithProducts = await Promise.all(
    orders.map(async (order) => {
      const { id, userId } = order as unknown as Order;
      const productIds = await getProducts(id);

      return {
        id,
        userId,
        productIds,
      };
    }),
  );

  const responseService: ServiceResponse<Order[]> = {
    status: 'SUCCESSFUL',
    data: ordersWithProducts,
  };
  return responseService;
}

export default { findAll };
