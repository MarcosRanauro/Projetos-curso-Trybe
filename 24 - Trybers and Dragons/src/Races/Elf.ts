import Race from './Race';

class Elf extends Race {
  private static _instancesCreated = 0;
  private readonly _maxLifePoints = 99;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    Elf._instancesCreated += 1;
  }

  override get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  static override createdRacesInstances(): number {
    return Elf._instancesCreated;
  }
}

export default Elf;