const { saleService } = require('../services');
const mapHttpStatus = require('../utils/mapHttpStatus');

const listAll = async (_request, response) => {
  const { status, data } = await saleService.listAll();

  return response.status(mapHttpStatus(status)).json(data);
};

const findOne = async (request, response) => {
  const { saleId } = request.params;

  const { status, data } = await saleService.findOne(saleId);

  return response.status(mapHttpStatus(status)).json(data);
};

const create = async (request, response) => {
  const saleData = request.body;

  const { status, data } = await saleService.create(saleData);

  return response.status(mapHttpStatus(status)).json(data);
};

module.exports = { 
  listAll,
  findOne,
  create,
};