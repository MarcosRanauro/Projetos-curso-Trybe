const { Router } = require('express');
const productRouter = require('./product.routes');
const saleRouter = require('./sale.routes');

const appRouter = Router();

appRouter.use('/products', productRouter);
appRouter.use('/sales', saleRouter);

module.exports = appRouter;