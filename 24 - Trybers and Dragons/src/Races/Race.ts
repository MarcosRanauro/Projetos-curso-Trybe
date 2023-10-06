abstract class Race {
  // ? Atributos privados
  private readonly _name: string;
  private readonly _dexterity: number;

  constructor(name: string, dexterity: number) {
    this._name = name;
    this._dexterity = dexterity;
  }

  // ? Métodos getters
  get name(): string { return this._name; }
  get dexterity(): number { return this._dexterity; }

  // ? Métodos abstratos
  abstract get maxLifePoints(): number;

  // ? Métodos estáticos
  static createdRacesInstances(): number {
    throw new Error('Not implemented');
  }
}

export default Race;