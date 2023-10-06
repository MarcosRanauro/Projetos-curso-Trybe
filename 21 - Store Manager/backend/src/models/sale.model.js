const camelize = require('camelize');

const connection = require('./connection');
const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
} = require('../utils/generateFormattedQuery');

const findAll = async () => {
  const query = `SELECT s.id as sale_id, s.date, sp.product_id, sp.quantity FROM sales as s
  LEFT JOIN sales_products as sp ON s.id = sp.sale_id
  ORDER BY s.id, sp.product_id;`;
  const [sales] = await connection.execute(query); // [[sales], [buffer ]]
  return camelize(sales);
};
const findById = async (saleId) => {
  const query = `SELECT s.date, sp.product_id, sp.quantity FROM sales_products as sp 
  LEFT JOIN sales as s ON sp.sale_id  = s.id
  WHERE sp.sale_id = ?;`;
  const [sale] = await connection.execute(query, [saleId]); // [[sales], [buffer ]]
  return camelize(sale);
};

const insert = async (saleData) => {
  const nowDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const querySale = `INSERT INTO sales(date) VALUES("${nowDateTime}")`;
  const [{ insertId: saleId }] = await connection.execute(querySale);

  const mapSaleData = saleData.map((data) => ({ ...data, saleId }));

  const promises = mapSaleData.map((mappedSaleData) => {
    const formattedColumns = getFormattedColumnNames(mappedSaleData);
    const formattedPlaceholders = getFormattedPlaceholders(mappedSaleData);

    const query = `INSERT INTO sales_products(${formattedColumns})
    VALUES(${formattedPlaceholders});`;
    return connection.execute(query, Object.values(mappedSaleData));
  });

  await Promise.all(promises);

  return saleId;
};

module.exports = {
  findAll,
  findById,
  insert,
};