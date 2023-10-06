import { Request, Response, Router } from 'express';
import TeamController from '../controller/TeamController';

const teamController = new TeamController();

const teamRouter = Router();

teamRouter.get('/teams', (req: Request, res: Response) => teamController.list(req, res));
teamRouter.get('/teams/:id', (req: Request, res: Response) => teamController.getTeamById(req, res));

export default teamRouter;
