import { JwtPayload } from 'jsonwebtoken'

export const Matches = [
  {
    id: 1,
    homeTeamId: 3,
    homeTeamGoals: 1,
    awayTeamId: 5,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "Botafogo"
    },
    awayTeam: {
      teamName: "Cruzeiro"
    }
  },
  {
    id: 41,
    homeTeamId: 12,
    homeTeamGoals: 2,
    awayTeamId: 8,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "Palmeiras"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  }
]

export const matchesInprogressTrue = [
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Internacional"
    }
  },
  {
    id: 42,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "Ferroviária"
    },
    awayTeam: {
      teamName: "Avaí/Kindermann"
    }
  }
]

export const matchesInprogressFalse = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "Internacional"
    },
    awayTeam: {
      teamName: "Santos"
    }
  }
]

export const matchCreated = {
  id: 3,
  homeTeamId: 3,
  homeTeamGoals: 3,
  awayTeamId: 4,
  awayTeamGoals: 4,
  inProgress: false,
}

export const updatedMatch = {
  id: 1,
    homeTeamId: 13,
    homeTeamGoals: 3,
    awayTeamId: 1,
    awayTeamGoals: 4,
    inProgress: false,
}

export const matchToCreate = {
  homeTeamId: 6,
  homeTeamGoals: 3,
  awayTeamId: 2,
  awayTeamGoals: 5,
  inProgress: false,
}

export const payload: JwtPayload = {
  id: 1,
  username: 'User',
  role: 'user', 
}