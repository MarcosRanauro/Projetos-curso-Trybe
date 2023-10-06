const express = require('express');
const { categoryController } = require('../controller');
const { validateJWT, newCategoryValidation } = require('../middlewares');

const categoryRouter = express.Router();

categoryRouter.post('/', validateJWT, newCategoryValidation, categoryController.create);
categoryRouter.get('/', validateJWT, categoryController.getAll);

module.exports = categoryRouter;