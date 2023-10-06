import { Response, Request } from 'express';
import MatchService from '../service/Match.Service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private matchService: MatchService = new MatchService()) {}

  public getAllMatches = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query;
    const serviceResponse = await this.matchService.listMatches(inProgress as string);
    return this.sendResponse(res, serviceResponse);
  };

  public updateProgress = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const serviceResponse = await this.matchService.setMatchFinish(Number(id));
    return this.sendResponse(res, serviceResponse);
  };

  public updateMatch = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const data = req.body;
    const serviceResponse = await this.matchService.updateMatch(Number(id), data);
    return this.sendResponse(res, serviceResponse);
  };

  public registerMatch = async (req: Request, res: Response): Promise<Response> => {
    const newMatch = {
      ...req.body,
      inProgress: true,
    };
    const serviceResponse = await this.matchService.registerMatch(newMatch);
    return this.sendResponse(res, serviceResponse);
  };

  private sendResponse = (res: Response, serviceResponse: any): Response => {
    const statusCode = mapStatusHTTP(serviceResponse.status);
    return res.status(statusCode).json(serviceResponse.data);
  };
}
