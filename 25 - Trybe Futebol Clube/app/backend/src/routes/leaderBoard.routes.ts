import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();

const leaderBoardRoutes = Router();

leaderBoardRoutes.get(
  '/leaderboard/home',
  (req: Request, res: Response) => leaderBoardController.qetAllLeaderBoard(req, res),
);
leaderBoardRoutes.get(
  '/leaderboard/away',
  (req: Request, res: Response) => leaderBoardController.getAwayLeaderBoard(req, res),
);

export default leaderBoardRoutes;
