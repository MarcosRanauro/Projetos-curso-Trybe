import sequelize = require('sequelize');
import { NewEntity } from '../Interfaces';
import Match from '../database/models/MatchModel';
import { IMatch } from '../Interfaces/IMatch';
import { IMatchModel } from '../Interfaces/IMatchModel';
import Team from '../database/models/TeamModel';
import verifyQuery from '../utils/verifyQuery';

export default class MatchModel implements IMatchModel {
  private model = Match;

  private matchInclude = [
    { model: Team, as: 'homeTeam', attributes: ['teamName'] },
    { model: Team, as: 'awayTeam', attributes: ['teamName'] },
  ];

  async findAll(query: string): Promise<IMatch[]> {
    const whereClause = query ? { inProgress: verifyQuery(query) } : {};

    return this.model.findAll({
      include: this.matchInclude,
      where: whereClause,
    });
  }

  async findById(id: number): Promise<IMatch | null> {
    return this.model.findByPk(id, { include: this.matchInclude });
  }

  async create(newMatch: NewEntity<IMatch>): Promise<IMatch> {
    const dbData = await this.model.create(newMatch);
    return dbData;
  }

  async update(id: number, data: Partial<IMatch>): Promise<IMatch | null> {
    const [updatedRowCount] = await this.model.update(data, { where: { id } });
    if (updatedRowCount === 0) {
      return null;
    }
    return this.findById(id);
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async findByHomeTeamId(teamId: number): Promise<IMatch[]> {
    const homeTeams = await this.model.findAll({
      where: {
        [sequelize.Op.or]: [{ homeTeamId: teamId }],
        inProgress: false,
      },
    });
    return homeTeams;
  }

  async findByAwayTeamId(teamId: number): Promise<IMatch[]> {
    const awayTeams = await this.model.findAll({
      where: {
        [sequelize.Op.or]: [{ awayTeamId: teamId }],
        inProgress: false,
      },
    });
    return awayTeams;
  }
}
