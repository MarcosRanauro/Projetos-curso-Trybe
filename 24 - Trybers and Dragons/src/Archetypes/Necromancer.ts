import Archetype from './Archetype';
import { EnergyType } from '../Energy';

class Necromancer extends Archetype {
  private static _instancesCreated = 0;
  private readonly _energyType: EnergyType = 'mana';

  constructor(name: string) {
    super(name);
    Necromancer._instancesCreated += 1;
  }

  override get energyType(): EnergyType {
    return this._energyType;
  }

  static override createdArchetypeInstances(): number {
    return Necromancer._instancesCreated;
  }
}

export default Necromancer;