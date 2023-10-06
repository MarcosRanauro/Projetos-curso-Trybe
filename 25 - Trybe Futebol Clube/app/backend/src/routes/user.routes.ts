import { Request, Response, Router } from 'express';
import UserController from '../controller/UserController';
import Validations from '../middlewares/validations.middleware';
import AuthValidation from '../middlewares/authValidation.middleware';

const userController = new UserController();

const userRoutes = Router();

userRoutes.post(
  '/login',
  Validations.validateBody,
  Validations.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

userRoutes.get(
  '/login/role',
  AuthValidation.validateToken,
  (req: Request, res: Response) => UserController.getUserRoles(req, res),
);

export default userRoutes;
