const { addProductSchema, addSaleSchema } = require('./schemas');

const validateCreateProductData = (productData) => {
  const { error } = addProductSchema.validate(productData);
  if (error) {
    return { type: error.details[0].type, message: error.message };
  }
};

const validateCreateSaleData = (saleData) => {
  const { error } = addSaleSchema.validate(saleData);

  if (error) {
    return { type: error.details[0].type, message: error.message };
  }
};

module.exports = {
  validateCreateProductData,
  validateCreateSaleData,
};