const { BlogPost, PostCategory, Category, sequelize, User } = require('../models');

const create = async (title, content, categoryIds, userId) => {
  const categoriesExist = await Category.findAll({ where: { id: categoryIds } });
  if (categoriesExist.length !== categoryIds.length) {
 return { status: 'BAD_REQUEST',
  data: { message: 'one or more "categoryIds" not found' } }; 
}

  const response = await sequelize.transaction(async (t) => {
    const blogPost = await BlogPost.create({ title, content, userId }, { transaction: t });
    await PostCategory.bulkCreate(categoryIds.map((id) => ({
      categoryId: id, postId: blogPost.id })), { transaction: t });
    return blogPost;
  });

  return { status: 'CREATED', data: await BlogPost.findOne({ where: { id: response.id } }) };
};

const getPostInclude = [
  { model: User, as: 'user', attributes: { exclude: ['password'] } },
  { model: Category, as: 'categories', through: { attributes: [] } },
];

const getAll = async () => ({ status: 'SUCCESS',
data: await BlogPost.findAll({ include: getPostInclude }) });

const getById = async (id) => {
  const post = await BlogPost.findOne({ where: { id }, include: getPostInclude });
  return post ? { status: 'SUCCESS',
  data: post } : { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
};

const postUpdate = async (id, title, content, userId) => {
  if (!title || !content) {
 return { status: 'BAD_REQUEST',
  data: { message: 'Some required fields are missing' } }; 
}
  const post = await BlogPost.findOne({ where: { id } });

  if (!post) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  if (post.userId !== userId) {
 return { status: 'UNAUTHORIZED',
  data: { message: 'Unauthorized user' } }; 
}

  await BlogPost.update({ title, content }, { where: { id } });
  return { status: 'SUCCESS',
  data: await BlogPost.findOne({ where: { id }, include: getPostInclude }) };
};

module.exports = { create, getAll, getById, postUpdate };