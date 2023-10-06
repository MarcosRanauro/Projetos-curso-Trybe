const express = require('express');
const { userController } = require('../controller');
const { newUserValidation } = require('../middlewares');
const { validateJWT } = require('../middlewares');

const userRouter = express.Router();

userRouter.post('/', newUserValidation, userController.create);
userRouter.get('/', validateJWT, userController.getAll);
userRouter.get('/:id', validateJWT, userController.getById);

module.exports = userRouter;