const mapStatusHttp = require('../utils/mapStatusHTTP');
const { blogPostsService } = require('../services');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  const { status, data } = await blogPostsService.create(title, content, categoryIds, id);
  return res.status(mapStatusHttp(status)).json(data);
};

const getAll = async (_req, res) => {
  const { status, data } = await blogPostsService.getAll();
  return res.status(mapStatusHttp(status)).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await blogPostsService.getById(id);
  return res.status(mapStatusHttp(status)).json(data);
};

const postUpdate = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { id: userId } = req.user;
  const { status, data } = await blogPostsService.postUpdate(
    id,
    title,
    content,
    userId,
    );
  return res.status(mapStatusHttp(status)).json(data);
};

module.exports = {
  create,
  getAll,
  getById,
  postUpdate,
};