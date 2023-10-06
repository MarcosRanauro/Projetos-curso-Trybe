import { Request, Response, NextFunction } from 'express';
import JWToken from '../utils/JWToken';

export default class AuthValidation {
  static async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    const payload = JWToken.verify(token);
    res.locals.user = payload;

    next();
  }
}
