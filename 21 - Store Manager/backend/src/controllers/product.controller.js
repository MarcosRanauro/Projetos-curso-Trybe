const { productService } = require('../services');
const mapHttpStatus = require('../utils/mapHttpStatus');

const listAll = async (_request, response) => {
  const { status, data } = await productService.listAll();
  return response.status(mapHttpStatus(status)).json(data);
};
const findOne = async (request, response) => {
  const { productId } = request.params;
  const { status, data } = await productService.findOne(productId);
  return response.status(mapHttpStatus(status)).json(data);
};

const create = async (request, response) => {
  const productData = request.body;

  const { status, data } = await productService.create(productData);

  return response.status(mapHttpStatus(status)).json(data);
};

module.exports = {
  listAll,
  findOne,
  create,
};