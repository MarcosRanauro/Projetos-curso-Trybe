import { ID } from '.';

export interface ICRUDModelCreator<T> {
  create(data: Partial<T>): Promise<T>,
}

export interface MatchModel<T>{
  findAll(query: string): Promise<T[]>,
  findById(id: ID): Promise<T | null>,
  finishMatch(id: ID): Promise<void>,
  findByHomeTeamId(teamId: ID): Promise<T[]>,
  findByAwayTeamId(teamId: ID): Promise<T[]>,
}

export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: ID): Promise<T | null>,
}

export interface ICRUDModelUpdater<T> {
  update(id: ID, data: Partial<T>): Promise<T | null>,
}

export interface ICRUDModelDeleter {
  delete(id: ID): Promise<number>,
}

export interface ICRUDModel<T>
  extends ICRUDModelCreator<T>, ICRUDModelReader<T>, ICRUDModelUpdater<T>,
  ICRUDModelDeleter { }

export interface CRUDModel<T>
  extends ICRUDModelCreator<T>, MatchModel<T>, ICRUDModelUpdater<T> { }
