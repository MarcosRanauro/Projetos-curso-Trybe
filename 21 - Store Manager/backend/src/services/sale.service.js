const { saleModel, productModel } = require('../models');
const mapJoiError = require('./validations/mapJoiError');
const { validateCreateSaleData } = require('./validations/validateInputValues');

const listAll = async () => {
  const sales = await saleModel.findAll();
  return { status: 'SUCCESSFUL', data: sales };
};
const findOne = async (saleId) => {
  const sale = await saleModel.findById(saleId);
  if (sale.length === 0 || !sale) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data: sale };
};

const verifyIfProductsExists = async (saleData) => {
  let productNotFound = false;

  const promises = saleData.map(async (data) => {
    const product = await productModel.findById(data.productId);

    if (!product) {
      productNotFound = true;
    }
  });

  await Promise.all(promises);

  return productNotFound;
};

const create = async (saleData) => {
  const error = validateCreateSaleData(saleData);

  if (error) {
    return { status: mapJoiError(error.type), data: { message: error.message } };
  }

  const productNotFound = await verifyIfProductsExists(saleData);

  if (productNotFound) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const saleId = await saleModel.insert(saleData);

  const newSale = {
    id: saleId,
    itemsSold: saleData,
  };
  return { status: 'CREATED', data: newSale };
};
module.exports = {
  listAll,
  findOne,
  create,
};