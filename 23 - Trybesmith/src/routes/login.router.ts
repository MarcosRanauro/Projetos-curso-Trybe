import { Router } from 'express';
import loginController from '../controllers/login.controller';
import userValidate from '../middlewares/user.middleware';
import loginValidate from '../middlewares/login.middleware';
import productController from '../controllers/product.controller';

const loginRouter = Router();

loginRouter.post(
  '/products',
  userValidate.validateName,
  userValidate.validatePrice,
  productController.create,
);
loginRouter.post('/login', loginValidate.validateName, loginController.login);

export default loginRouter;