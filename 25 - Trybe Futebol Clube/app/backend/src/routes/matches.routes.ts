import { Request, Response, Router } from 'express';
import MatchController from '../controller/MatchController';
import AuthValidation from '../middlewares/authValidation.middleware';

const matchController = new MatchController();

const matchRoutes = Router();

matchRoutes.get(
  '/matches',
  (req: Request, res: Response) => matchController.getAllMatches(req, res),
);

matchRoutes.patch(
  '/matches/:id/finish',
  AuthValidation.validateToken,
  (req: Request, res: Response) => matchController.updateProgress(req, res),
);
matchRoutes.patch(
  '/matches/:id',
  AuthValidation.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);
matchRoutes.post(
  '/matches',
  AuthValidation.validateToken,
  (req: Request, res: Response) => matchController.registerMatch(req, res),
);

export default matchRoutes;
