import { ServiceResponse, ServiceResponseMsg } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/IMatch';
import { IMatchModel } from '../Interfaces/IMatchModel';
import { ITeamModel } from '../Interfaces/ITeamModel';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async listMatches(query: string): Promise<ServiceResponse<IMatch[] | null>> {
    const allMatches = await this.matchModel.findAll(query as string);
    return { status: 'SUCCESS', data: allMatches };
  }

  public async setMatchFinish(id: IMatch['id']): Promise<ServiceResponse<ServiceResponseMsg>> {
    await this.matchModel.finishMatch(id);
    return { status: 'SUCCESS', data: { message: 'Finished' } };
  }

  public async updateMatch(
    id: IMatch['id'],
    data: Partial<IMatch>,
  ): Promise<ServiceResponse<ServiceResponseMsg>> {
    await this.matchModel.update(id, data);
    return { status: 'SUCCESS', data: { message: 'Updated' } };
  }

  public async registerMatch(newMatch: IMatch): Promise<ServiceResponse<IMatch | null>> {
    const { homeTeamId, awayTeamId } = newMatch;

    if (homeTeamId === awayTeamId) {
      return {
        status: 'UNPROCESSABLE',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    const [homeTeamExists, awayTeamExists] = await Promise.all([
      this.teamModel.findById(homeTeamId),
      this.teamModel.findById(awayTeamId),
    ]);

    if (!homeTeamExists || !awayTeamExists) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const newMatchCreated = await this.matchModel.create(newMatch);
    return { status: 'CREATED', data: newMatchCreated };
  }
}
