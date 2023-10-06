import { Router } from 'express';
import teamRouter from './team.routes';
import userRouter from './user.routes';
import matchRouter from './matches.routes';
import leaderBoardRouter from './leaderBoard.routes';

const router = Router();

router.use(teamRouter);
router.use(userRouter);
router.use(matchRouter);
router.use(leaderBoardRouter);

export default router;
