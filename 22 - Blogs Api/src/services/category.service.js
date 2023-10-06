const { Category } = require('../models');

const create = async (name) => {
  const category = await Category.create({ name });
  return { status: 'CREATED', data: category };
};

const getAll = async () => {
  const categories = await Category.findAll();
  return { status: 'SUCCESS', data: categories };
};

module.exports = {
  create,
  getAll,
};