interface SimpleFighter{
  // ? Atributos
  lifePoints: number;
  strength: number;

  // ? Métodos
  attack(enemy: SimpleFighter): void;
  receiveDamage(attackPoints: number): number;
}

export default SimpleFighter;