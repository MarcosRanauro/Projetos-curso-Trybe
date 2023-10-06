import Race from './Race';

class Orc extends Race {
  private static _instancesCreated = 0;
  private readonly _maxLifePoints = 74;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    Orc._instancesCreated += 1;
  }

  override get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  static override createdRacesInstances(): number {
    return Orc._instancesCreated;
  }
}

export default Orc;