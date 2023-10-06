const { Router } = require('express');
const { productController } = require('../controllers');

const productRouter = Router();

productRouter.get('/', productController.listAll);
productRouter.get('/:productId', productController.findOne);
productRouter.post('/', productController.create);

module.exports = productRouter;