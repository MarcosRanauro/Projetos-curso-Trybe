import { RequestHandler } from 'express';
import loginService from '../services/login.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  const { status, data } = await loginService.login(username, password);
  const statusCode = mapStatusHTTP(status);

  if (status === 'UNAUTHORIZED') {
    return res.status(statusCode).json(data);
  } 
  return res.status(200).json(data);
};

export default {
  login,
};
