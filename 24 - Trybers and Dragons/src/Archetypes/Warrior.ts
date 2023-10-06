import Archetype from './Archetype';
import { EnergyType } from '../Energy';

class Warrior extends Archetype {
  private static _instancesCreated = 0;
  private readonly _energyType: EnergyType = 'stamina';

  constructor(name: string) {
    super(name);
    Warrior._instancesCreated += 1;
  }

  override get energyType(): EnergyType {
    return this._energyType;
  }

  static override createdArchetypeInstances(): number {
    return Warrior._instancesCreated;
  }
}

export default Warrior;