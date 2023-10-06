import Archetype from './Archetype';
import { EnergyType } from '../Energy';

class Ranger extends Archetype {
  private static _instancesCreated = 0;
  private readonly _energyType: EnergyType = 'stamina';

  constructor(name: string) {
    super(name);
    Ranger._instancesCreated += 1;
  }

  override get energyType(): EnergyType {
    return this._energyType;
  }

  static override createdArchetypeInstances(): number {
    return Ranger._instancesCreated;
  }
}

export default Ranger;