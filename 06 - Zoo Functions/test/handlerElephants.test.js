const handlerElephants = require('../src/handlerElephants');

describe('Testes da função HandlerElephants', () => {
  it('Verifica se a função retorna a quantidade de Elefantes', () => {
    expect(handlerElephants('count')).toEqual(4);
  });
  it('Verifica se a função retorna os nomes dos elefantes em um array', () => {
    expect(handlerElephants('names')).toContain('Orval');
  });
  it('Verifica se a função retorna a média da idade dos elefantes', () => {
    expect(handlerElephants('averageAge')).toBeCloseTo(10.5);
  });
  it('Verifica se a função retorna a localização dos elefantes dentro do Zoológico', () => {
    expect(handlerElephants('location')).toBe('NW');
  });
  it('Verifica se a função retorna a popularidade dos elefantes', () => {
    expect(handlerElephants('popularity')).toBeGreaterThanOrEqual(5);
  });
  it('Verifica se a função retorna um array com a relação de dias em que é possível visitar os elefantes', () => {
    expect(handlerElephants('availability')).not.toContain('Monday');
  });
  it('Verifica se a função retorna undefined se não receber parametro', () => {
    expect(handlerElephants()).toBe(undefined);
  });
  it('Verifica se a função retorna um erro se receber um objeto vazio', () => {
    expect(handlerElephants({})).toBe('Parâmetro inválido, é necessário uma string');
  });
  it('Verifica se a função retorna null', () => {
    expect(handlerElephants('Marcos')).toBe(null);
  });
});
