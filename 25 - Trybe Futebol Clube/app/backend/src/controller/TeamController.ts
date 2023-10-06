import { Request, Response } from 'express';
import TeamService from '../service/Team.Service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(private teamService: TeamService = new TeamService()) {}

  public async list(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.teamService.list();
    const statusCode = mapStatusHTTP(serviceResponse.status);

    return res.status(statusCode).json(serviceResponse.data);
  }

  public async getTeamById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const serviceResponse = await this.teamService.getById(Number(id));
    const statusCode = mapStatusHTTP(serviceResponse.status);

    return res.status(statusCode).json(serviceResponse.data);
  }
}
