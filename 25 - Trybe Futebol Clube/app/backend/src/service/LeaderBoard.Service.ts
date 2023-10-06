import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/IMatchModel';
import { IMatch } from '../Interfaces/IMatch';
import { ITeamModel } from '../Interfaces/ITeamModel';
import { ILeaderBoard } from '../Interfaces/ILeaderBoard';
import TeamModel from '../models/TeamModel';
import { ITeam } from '../Interfaces/ITeam';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

type Results = 'totalVictories' | 'totalDraws' | 'totalLosses';

export default class LeaderBoardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) {
  }

  private static classifications = (): ILeaderBoard => ({
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  });

  static calculateEfficiency(totalPoints: number, totalGames: number): number {
    return ((totalPoints / (totalGames * 3)) * 100);
  }

  private static calculateEstatistics(homeGoals: number, awayGoals: number): [number, Results] {
    const diffGoals = homeGoals - awayGoals;
    if (diffGoals > 0) return [3, 'totalVictories'];
    if (diffGoals < 0) return [0, 'totalLosses'];
    return [1, 'totalDraws'];
  }

  private static editClassifications(teamId: ITeam['id'], match: IMatch): ILeaderBoard {
    const teamClassifications = LeaderBoardService.classifications();

    let points = 0;
    let result: Results;

    if (match.homeTeamId === teamId) {
      [points, result] = LeaderBoardService
        .calculateEstatistics(match.homeTeamGoals, match.awayTeamGoals);
      teamClassifications.goalsFavor = match.homeTeamGoals;
      teamClassifications.goalsOwn = match.awayTeamGoals;
    } else {
      [points, result] = LeaderBoardService
        .calculateEstatistics(match.awayTeamGoals, match.homeTeamGoals);
      teamClassifications.goalsOwn = match.homeTeamGoals;
      teamClassifications.goalsFavor = match.awayTeamGoals;
    }

    teamClassifications.totalPoints += points;
    teamClassifications[result] += 1;
    teamClassifications.totalGames += 1;
    return teamClassifications;
  }

  private static completeClassifications(allClassifications: ILeaderBoard[]): ILeaderBoard {
    const newClassifications = allClassifications.reduce((acc, currTeam) => {
      acc.totalPoints += currTeam.totalPoints;
      acc.totalGames += currTeam.totalGames;
      acc.totalVictories += currTeam.totalVictories;
      acc.totalDraws += currTeam.totalDraws;
      acc.totalLosses += currTeam.totalLosses;
      acc.goalsFavor += currTeam.goalsFavor;
      acc.goalsOwn += currTeam.goalsOwn;
      return acc;
    }, LeaderBoardService.classifications());

    return {
      name: allClassifications[0].name,
      ...newClassifications,
      goalsBalance: newClassifications.goalsFavor - newClassifications.goalsOwn,
      efficiency: LeaderBoardService
        .calculateEfficiency(newClassifications.totalPoints, newClassifications.totalGames),
    };
  }

  private static sortClassifications(allClassifications: ILeaderBoard[]): ILeaderBoard[] {
    return allClassifications.sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => {
        if (a.goalsBalance && b.goalsBalance) return b.goalsBalance - a.goalsBalance;
        return 1;
      }).sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }

  async getHomeLeaderBoard(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const allTeams = await this.teamModel.findAll();

    const results = allTeams.map(async (team) => {
      const homeTeamsMatches = await this.matchModel.findByHomeTeamId(team.id);
      const teamClassifications: ILeaderBoard[] = [];

      homeTeamsMatches.forEach((match) => {
        const teamClassificationMatch = LeaderBoardService
          .editClassifications(team.id, match);
        teamClassifications.push(teamClassificationMatch);
      });

      const finalClassification = LeaderBoardService.completeClassifications(teamClassifications);
      finalClassification.name = team.teamName;

      return finalClassification;
    });

    const allTeamsLB = await Promise.all(results);
    const sortedAllTeamsLB = LeaderBoardService.sortClassifications(allTeamsLB);

    return { status: 'SUCCESS', data: sortedAllTeamsLB };
  }

  async getAwayLeaderBoard(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const allTeams = await this.teamModel.findAll();

    const results = await Promise.all(allTeams.map(async (team) => {
      const awayTeamsMatches = await this.matchModel.findByAwayTeamId(team.id);
      const teamClassifications: ILeaderBoard[] = [];

      awayTeamsMatches.forEach((match: IMatch) => {
        if (!match.inProgress) {
          const teamClassificationMatch = LeaderBoardService.editClassifications(team.id, match);
          teamClassifications.push(teamClassificationMatch);
        }
      });

      const finalClassification = LeaderBoardService.completeClassifications(teamClassifications);
      finalClassification.name = team.teamName;

      return finalClassification;
    }));

    const sortedAllTeamsLB = LeaderBoardService.sortClassifications(results);

    return { status: 'SUCCESS', data: sortedAllTeamsLB };
  }
}
