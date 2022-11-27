const createMenu = require('../src/restaurant');
 
/*
  Você é responsável por escrever o código do sistema de pedidos de um restaurante através do qual será possível
  cadastrar um menu. Dado que um menu foi cadastrado, o sistema deve disponibilizar um objeto que permite:

  - Ler o menu cadastrado;
  - Fazer pedidos;
  - Verificar o que foi pedido;
  - Somar o valor da conta.

  A estrutura deste código e deste objeto já está definida e você precisa implementá-la.
  Abaixo você verá uma série de testes e passos que irão guiar você e, que devem NECESSARIAMENTE ser realizados em ordem para o bom desenvolvimento do sistema.

  Desenvolvimento:
  - Uma função: 
    createMenu()
  - Recebe um parâmetro que é um objeto, o menu:
    Exemplo: { food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} }.

  A função createMenu() então, retornará um novo objeto. Este novo objeto contém algumas chaves e ao acessar cada uma delas temos os seguintes retornos:

  - Uma chave `fetchMenu` retornando o menu, que nada mais é que o objeto passado como parâmetro para createMenu()

    Exemplo:
    const meuRestaurante = createMenu({
      food: {'coxinha': 3.90, 'sanduiche', 9.90},
      drinks: {'agua': 3.90, 'cerveja': 6.90}
    });

    meuRestaurante.fetchMenu() // Retorno: Menu acima

  - Uma chave `consumption` armazenando um array de strings. Cada string é a chave de um pedido.
    Exemplo: ['coxinha', 'cerveja']

  - Uma chave `order` armazenando uma função. Essa função recebe uma string como parâmetro e essa string deve ser adicionada à lista armazenada em `consumption`.

  - Uma chave `pay` que, quando chamada, invoca uma função. Essa função faz a soma do preço de todos os pedidos, retornando essa soma de preços com acréscimo de 10%.

  Comportamento:
    const meuRestaurante = createMenu({ food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} })

    meuRestaurante.fetchMenu() // Retorno: { food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} }

    meuRestaurante.order('coxinha') // Retorno: undefined

    meuRestaurante.consumption // Retorno: ['coxinha']

    meuRestaurante.pay() // Retorno: 4.29

  IMPORTANTE: FAÇA OS TESTES E PASSOS DE ACORDO COM A SEQUÊNCIA INDICADA NO README DO PROJETO!

*/

const menu = { 
  food: {'coxinha': 3.9, 'sopa': 9.9}, 
  drink: {'agua': 3.9, 'cerveja': 6.9},
};

describe('10 - Implemente a função `createMenu`, bem como seus casos de teste', () => {
  it('Verifica se a função `createMenu` retorna um objeto', () => {
    expect(typeof createMenu(menu)).toEqual('object');
    expect(Object.keys(createMenu(menu))).toContain('fetchMenu');
  });

  it('Verifica se a função `createMenu` retorna um objeto cujas chaves são somente `food` e `drink`', () => {
    expect(Object.keys(createMenu(menu).fetchMenu())).toEqual(["food", "drink"]);
  });  

  it('Verifica se a função `createMenu` retorna um objeto identico ao passado', () => {
    expect(createMenu(menu).fetchMenu()).toEqual(menu);
  });   

  it('Verifica se a função `createMenu` retorna um objeto com a chave consumption', () => {
    expect(createMenu(menu).consumption).not.toBe(undefined);
  });   

  it('Verifica se a função `createMenu` retorna um objeto com a chave consumption', () => {
    expect(createMenu(menu).order).not.toBe(["coxinha"]);
  });   

  it('Verifica se ao chamar o order um novo pedido é adicionado em consumption', () => {
    expect(createMenu(menu).order("coxinha")).not.toBe(["coxinha"]);
  });   

  const myMenu1 = createMenu(menu);
  myMenu1.order("coxinha");
  myMenu1.order("agua");
  myMenu1.order("sopa");
  myMenu1.order("sashimi"); 

  it('Verifica se ao chamar o order várias vezes, os pedidos são guardados corretamente', () => {
    expect(myMenu1.consumption).toEqual(["coxinha", "agua", "sopa", "sashimi"]);
  });

  const myMenu2 = createMenu(menu);
  myMenu2.order('coxinha');
  myMenu2.order('agua');
  myMenu2.order('coxinha');

  it('Verifica se ao chamar o order várias vezes, pedidos repetidos podem ser adicioandos', () => {
      expect(myMenu2.consumption).toEqual(['coxinha', 'agua', 'coxinha']);
  });

  const myMenu3 = createMenu(menu);
  myMenu3.order('coxinha');
  myMenu3.order('agua');
  myMenu3.order('coxinha');

  it('Verifica se retorna o preço corretamente', () => {
    expect(myMenu3.pay()).toBeCloseTo(12.87);
  });
});
