import { Request, Response } from 'express';
import UserService from '../service/User.Service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(private userService: UserService = new UserService()) { }

  public async login(req: Request, res: Response) {
    const { body } = req;
    const response = await this.userService.login(body);
    const statusCode = mapStatusHTTP(response.status);

    return res.status(statusCode).json(response.data);
  }

  public static getUserRoles(req: Request, res: Response) {
    const { user } = res.locals;

    return res.status(200).json({ role: user.role });
  }
}
