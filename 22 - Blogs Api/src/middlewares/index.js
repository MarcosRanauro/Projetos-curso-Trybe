const loginValidation = require('./loginValidation');
const newUserValidation = require('./newUserValidation');
const validateJWT = require('./validateJWT');
const newCategoryValidation = require('./newCategoryValidation');
const newBlogPostValidation = require('./newBlogPostValidation');

module.exports = {
  loginValidation,
  newUserValidation,
  validateJWT,
  newCategoryValidation,
  newBlogPostValidation,
};