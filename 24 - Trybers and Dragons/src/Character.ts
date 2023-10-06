import Archetype, { Mage } from './Archetypes';
import Race, { Elf } from './Races';
import Energy from './Energy';
import Fighter from './Fighter';
import getRandomInt from './utils';
import SimpleFighter from './Fighter/SimpleFighter';

class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;

  constructor(name: string) {
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._race.maxLifePoints / 2;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  // ? Método receiveDamage
  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;

    if (damage > 0) {
      this._lifePoints -= damage;
    } else {
      this._lifePoints -= 1;
    }

    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }

    return this._lifePoints;
  }

  // ? Ataque básico
  attack(enemy: Fighter): void;
  attack(enemy: SimpleFighter): void;

  attack(enemy: Fighter | SimpleFighter): void {
    const damage = this._strength;
    enemy.receiveDamage(damage);
  }
  
  // ? Método levelUp
  levelUp(): void {
    this._maxLifePoints = Math.min(
      this._maxLifePoints + getRandomInt(1, 10),
      this._race.maxLifePoints,
    );
    this._strength = Math.min(this._strength + getRandomInt(1, 10));
    this._dexterity = Math.min(this._dexterity + getRandomInt(1, 10));
    this._defense = Math.min(this._defense + getRandomInt(1, 10));
    this._energy.amount = 10;
    this._lifePoints = this._maxLifePoints;
  }

  // ? Getters
  get race(): Race { return this._race; }
  get archetype(): Archetype { return this._archetype; }
  get maxLifePoints(): number { return this._maxLifePoints; }
  get lifePoints(): number { return this._lifePoints; }
  get strength(): number { return this._strength; }
  get defense(): number { return this._defense; }
  get dexterity(): number { return this._dexterity; }
  get energy(): Energy { return { ...this._energy }; }
}

export default Character;