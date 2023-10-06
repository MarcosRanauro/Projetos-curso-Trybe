const { Router } = require('express');

const { saleController } = require('../controllers');

const saleRouter = Router();

saleRouter.get('/', saleController.listAll);
saleRouter.get('/:saleId', saleController.findOne);
saleRouter.post('/', saleController.create);

module.exports = saleRouter;