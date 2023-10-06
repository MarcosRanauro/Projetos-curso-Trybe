import Race from './Race';

class Dwarf extends Race {
  private static _instancesCreated = 0;
  private readonly _maxLifePoints = 80;

  constructor(name: string, dexterity: number) {
    // ? Super chama o construtor da classe pai
    super(name, dexterity);
    // ? Atributo para função createdRacesInstances que contabiliza quantas instâncias foram criadas
    Dwarf._instancesCreated += 1;
  }

  override get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  // ? Método estático que retorna o número de instâncias criadas
  static override createdRacesInstances(): number {
    return Dwarf._instancesCreated;
  }
}

export default Dwarf;
