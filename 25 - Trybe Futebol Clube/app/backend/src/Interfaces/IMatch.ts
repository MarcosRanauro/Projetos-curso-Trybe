import { Identifiable } from '.';

export interface IMatch extends Identifiable {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface MatchAssociation extends IMatch {
  homeTeam: {
    teamName: string | undefined;
  }
  awayTeam: {
    teamName: string | undefined;
  }
}
