import { ProductInputtableTypes } from '../../src/database/models/product.model';

const newProduct: ProductInputtableTypes = {
  "name": 'Product 1',
  "price": "100 dollars",
  "orderId": 1,
};

const returnedProduct = {
  "id": 1,
  "name": 'Product 1',
  "price": "100 dollars",
  "orderId": 1,
};

export default {
  newProduct,
  returnedProduct,
};
