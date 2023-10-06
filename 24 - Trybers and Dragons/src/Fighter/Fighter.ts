import Energy from '../Energy';

// ? Interrogação'?' significa que o atributo é opcional

interface FighterBase {
  // ? Atributos comuns a todos os Fighters
  lifePoints: number;
  strength: number;
  defense: number;
  energy?: Energy;
}

interface Fighter extends FighterBase {
  // ? Métodos comuns a todos os Fighters
  levelUp(): void;
  receiveDamage(attackPoints: number): number;

  // ? Método de ataque
  attack(enemy: FighterBase): void;

  // ? Método especial (opcional)
  special?(enemy: FighterBase): void;
}

export default Fighter;