import { Router } from 'express';
import orderRouter from './order.router';
import productRouter from './product.router';
import loginRouter from './login.router';

const routes = Router();

routes.use(orderRouter);
routes.use(productRouter);
routes.use(loginRouter);

export default routes;