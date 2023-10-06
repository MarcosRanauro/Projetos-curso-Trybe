import Race from './Race';

class Halfling extends Race {
  private static _instancesCreated = 0;
  private readonly _maxLifePoints = 60;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    Halfling._instancesCreated += 1;
  }

  override get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  static override createdRacesInstances(): number {
    return Halfling._instancesCreated;
  }
}

export default Halfling;