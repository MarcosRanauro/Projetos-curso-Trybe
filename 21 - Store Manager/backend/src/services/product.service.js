const { productModel } = require('../models');
const mapJoiError = require('./validations/mapJoiError');
const { validateCreateProductData } = require('./validations/validateInputValues');

const listAll = async () => {
  const products = await productModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};
const findOne = async (productId) => {
  const product = await productModel.findById(productId);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: product };
};

const create = async (productData) => {
  const error = validateCreateProductData(productData);

  if (error) {
    return { status: mapJoiError(error.type), data: { message: error.message } };
  }

  const productId = await productModel.insert(productData);

  const newProduct = {
    id: productId,
    ...productData,
  };
  return { status: 'CREATED', data: newProduct };
};
module.exports = {
  listAll,
  findOne,
  create,
};