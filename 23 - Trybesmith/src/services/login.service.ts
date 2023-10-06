import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponseLogin';
import jwtUtils from '../utils/jwtUtils';

type LoginResponse = ServiceResponse<{ token: string }>;

const unauthorizedResponse: LoginResponse = {
  status: 'UNAUTHORIZED',
  data: { message: 'Username or password invalid' },
};

const login = async (username: string, password: string): Promise<LoginResponse> => {
  const user = await UserModel.findOne({ where: { username } });
  if (!user) {
    return unauthorizedResponse;
  }
  const isValidPassword = await bcrypt.compare(password, user.dataValues.password);
  if (!isValidPassword) {
    return unauthorizedResponse;
  }
  const token = jwtUtils.signToken({ id: user.dataValues.id, username: user.dataValues.username });
  return { status: 'SUCCESS', data: { token } };
};

export default {
  login,
};
