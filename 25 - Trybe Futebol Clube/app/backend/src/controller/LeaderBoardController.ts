import { Response, Request } from 'express';
import LeaderBoardService from '../service/LeaderBoard.Service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderBoardController {
  constructor(private leaderBoardService: LeaderBoardService = new LeaderBoardService()) {}

  public qetAllLeaderBoard = async (req: Request, res: Response): Promise<Response> => {
    const serviceResponse = await this.leaderBoardService.getHomeLeaderBoard();

    const statusCode = mapStatusHTTP(serviceResponse.status);

    return res.status(statusCode).json(serviceResponse.data);
  };

  public getAwayLeaderBoard = async (req: Request, res: Response): Promise<Response> => {
    const serviceResponse = await this.leaderBoardService.getAwayLeaderBoard();

    const statusCode = mapStatusHTTP(serviceResponse.status);

    return res.status(statusCode).json(serviceResponse.data);
  };
}
