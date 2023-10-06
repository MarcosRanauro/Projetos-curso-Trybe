const camelize = require('camelize');

const connection = require('./connection');
const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
} = require('../utils/generateFormattedQuery');

const findAll = async () => {
  const query = 'SELECT * FROM products;';
  const [products] = await connection.execute(query);
  return camelize(products);
};
const findById = async (productId) => {
  const query = 'SELECT * FROM products WHERE id = ?;';
  const [[product]] = await connection.execute(query, [productId]);
  return camelize(product);
};

const insert = async (productData) => {
  const formattedColumns = getFormattedColumnNames(productData);
  const formattedPlaceholders = getFormattedPlaceholders(productData);

  const query = `INSERT INTO products(${formattedColumns}) VALUES(${formattedPlaceholders})`;

  const [{ insertId }] = await connection.execute(query, Object.values(productData)); // [{insertId}]

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};