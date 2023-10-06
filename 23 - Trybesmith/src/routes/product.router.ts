import { Router } from 'express';
import productController from '../controllers/product.controller';
import authProductInputs from '../middlewares/authProduct';

const productRouter = Router();

productRouter.post('/products', authProductInputs, productController.create);
productRouter.get('/products', productController.findAll);

export default productRouter;