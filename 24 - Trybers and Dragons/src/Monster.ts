import SimpleFighter from './Fighter/SimpleFighter';

class Monster implements SimpleFighter {
  private _lifePoints: number;
  private _strength: number;

  constructor() {
    this._lifePoints = 85;
    this._strength = 63;
  }

  // ? Implementação do método receiveDamage
  receiveDamage(attackPoints: number): number {
    const damage = attackPoints;

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

  // ? Implementação do attack da interface SimpleFighter
  attack(enemy: SimpleFighter): void {
    const damage = this._strength;
    enemy.receiveDamage(damage);
  }

  // ? Getters
  get lifePoints(): number { return this._lifePoints; }
  get strength(): number { return this._strength; }
}

export default Monster;
