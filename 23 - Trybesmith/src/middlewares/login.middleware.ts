import { RequestHandler } from 'express';

const validateName:RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ message: '"username" and "password" are required' });
  } if (!password) {
    return res.status(400).json({ message: '"username" and "password" are required' });
  }
  return next();
};

export default {
  validateName,
};
