import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'senha';

type Payload = {
  id: number;
  username:string
};

const signToken = (payload: Payload): string => {
  const token = jwt.sign(payload, secret, { expiresIn: '1d' });
  return token;
};

export default {
  signToken,
};
