const express = require('express');
const { blogPostsController } = require('../controller');

const { validateJWT, newBlogPostValidation } = require('../middlewares');

const blogPostRouter = express.Router();

blogPostRouter.post('/', validateJWT, newBlogPostValidation, blogPostsController.create);
blogPostRouter.get('/', validateJWT, blogPostsController.getAll);
blogPostRouter.get('/:id', validateJWT, blogPostsController.getById);
blogPostRouter.put('/:id', validateJWT, blogPostsController.postUpdate);

module.exports = blogPostRouter;