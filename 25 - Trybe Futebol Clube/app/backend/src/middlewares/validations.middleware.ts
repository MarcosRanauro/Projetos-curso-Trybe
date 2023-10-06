import { NextFunction, Request, Response } from 'express';

export default class Validations {
  public static validateBody(req: Request, res: Response, next: NextFunction): Response | void {
    const { body } = req;
    if (!body || !body.email || !body.password) {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }
    next();
  }

  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    next();
  }
}
