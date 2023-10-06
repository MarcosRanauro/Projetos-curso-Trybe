import Archetype from './Archetype';
import { EnergyType } from '../Energy';

class Mage extends Archetype {
  private static _instancesCreated = 0;
  private readonly _energyType: EnergyType = 'mana';

  constructor(name: string) {
    super(name);
    Mage._instancesCreated += 1;
  }

  override get energyType(): EnergyType {
    return this._energyType;
  }

  static override createdArchetypeInstances(): number {
    return Mage._instancesCreated;
  }
}

export default Mage;