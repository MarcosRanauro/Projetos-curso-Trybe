import { NewEntity } from '../Interfaces';
import Team from '../database/models/TeamModel';
import { ITeam } from '../Interfaces/ITeam';
import { ITeamModel } from '../Interfaces/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = Team;
  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async create(data: NewEntity<ITeam>): Promise<ITeam> {
    const newTeam = await this.model.create(data);
    return { id: newTeam.id, teamName: newTeam.teamName };
  }

  async findById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    if (!team) return null;
    return { id: team.id, teamName: team.teamName };
  }

  async update(id: ITeam['id'], data: Partial<NewEntity<ITeam>>): Promise<ITeam | null> {
    const team = await this.model.update(data, { where: { id } });
    if (!team) return null;
    return this.findById(id);
  }

  async delete(id: ITeam['id']): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}
