import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './services/renderWithRouter';
import SearchBar from '../components/SearchBar';

const search2InputId = 'search-input';
const execSearchBtnId = 'exec-search-btn';
const nameSearchRadioId = 'name-search-radio';
const firstLetterSearchRadio = 'first-letter-search-radio';
describe('Testando o componente SearchBar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Verifica se o componente SearchBar é renderizado', () => {
    renderWithRouter(<SearchBar />);
    const searchInput = screen.getByTestId(search2InputId);
    expect(searchInput).toBeInTheDocument();
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadio).toBeInTheDocument();
    const nameRadio = screen.getByTestId(nameSearchRadioId);
    expect(nameRadio).toBeInTheDocument();
    const firstLetterRadio = screen.getByTestId(firstLetterSearchRadio);
    expect(firstLetterRadio).toBeInTheDocument();
  });
  it('Testa se a busca retorna a resposta esperada', () => {
    renderWithRouter(<SearchBar />);
    const nameRadio = screen.getByTestId(nameSearchRadioId);
    const searchInput = screen.getByTestId(search2InputId);
    fireEvent.change(searchInput, { target: { value: 'chicken' } });
    expect(searchInput.value).toBe('chicken');
    fireEvent.click(nameRadio);
    expect(nameRadio.checked).toBe(true);
    const execSearchBtn = screen.getByTestId(execSearchBtnId);
    fireEvent.click(execSearchBtn);
  });
  it('Exibe uma mensagem de erro quando o tipo de pesquisa é Primeira letra e o comprimento do termo de pesquisa não é 1', () => {
    global.alert = jest.fn();
    renderWithRouter(<SearchBar />);
    const firstLetterSearchRadio2 = screen.getByTestId(firstLetterSearchRadio);
    const searchInput = screen.getByTestId(search2InputId);
    const searchButton = screen.getByTestId(execSearchBtnId);
    fireEvent.change(searchInput, { target: { value: 'chicken' } });
    fireEvent.click(firstLetterSearchRadio2);
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);
    expect(global.alert).toHaveBeenCalled();
  });
  it('Deve exibir um alerta se nenhuma receita for encontrada', async () => {
    const alertSpy = jest.spyOn(global, 'alert');
    const fetchSpy = jest.spyOn(window, 'fetch').mockResolvedValueOnce(new Response(JSON.stringify({}), { status: 200 }));
    renderWithRouter(<SearchBar />);
    const searchInput = screen.getByTestId(search2InputId);
    fireEvent.change(searchInput, { target: { value: 'invalid search term' } });
    const searchButton = screen.getByTestId(execSearchBtnId);
    fireEvent.click(searchButton);
    await waitFor(() => expect(alertSpy).toHaveBeenCalled());
    expect(alertSpy).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    fetchSpy.mockRestore();
  });
  it('Exibe os resultados da pesquisa quando o botão de pesquisa é clicado', async () => {
    const mockData = { meals: [{ idMeal: 1, strMeal: 'Test Meal' }] };
    const fet = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockData) }));
    global.fetch = fet;
    renderWithRouter(<SearchBar />);
    const searchInput = screen.getByTestId(search2InputId);
    const searchButton = screen.getByTestId(execSearchBtnId);
    fireEvent.change(searchInput, { target: { value: 'chicken' } });
    fireEvent.click(searchButton);
  });
  test('Não deve chamar history.push se não houver meals ou drinks com length igual a 1', () => {
    const data = {
      meals: null,
      drinks: [{ idDrink: '456' }, { idDrink: '789' }],
    };
    const history = {
      push: jest.fn(),
    };
    renderWithRouter(<SearchBar data={ data } history={ history } />);
    expect(history.push).not.toHaveBeenCalled();
  });
  test('Deve renderizar entrada, botões de opção e botão de pesquisa', () => {
    renderWithRouter(<SearchBar />);
    expect(screen.getByTestId(search2InputId)).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId(nameSearchRadioId)).toBeInTheDocument();
    expect(screen.getByTestId(firstLetterSearchRadio)).toBeInTheDocument();
    expect(screen.getByTestId(execSearchBtnId)).toBeInTheDocument();
  });
  test('Deve atualizar o estado do termo de pesquisa quando o valor de entrada muda', () => {
    renderWithRouter(<SearchBar />);
    const input = screen.getByTestId(search2InputId);
    fireEvent.change(input, { target: { value: 'chicken' } });
    expect(input.value).toBe('chicken');
  });
  test('Deve atualizar o estado do tipo de pesquisa quando o botão de opção é clicado', () => {
    renderWithRouter(<SearchBar />);
    const nameRadio = screen.getByTestId(nameSearchRadioId);
    const firstLetterRadio = screen.getByTestId(firstLetterSearchRadio);
    fireEvent.click(nameRadio);
    expect(nameRadio.checked).toBe(true);
    fireEvent.click(firstLetterRadio);
    expect(firstLetterRadio.checked).toBe(true);
  });

  test('Deve exibir os resultados da pesquisa quando o botão de pesquisa é clicado', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => ({
        meals: [
          {
            idMeal: '52977',
            strMeal: 'Corba',
            strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
          },
        ],
      }),
    }));
    const { history } = renderWithRouter(<SearchBar />);
    const searchInput = screen.getByTestId(search2InputId);
    const searchButton = screen.getByTestId(execSearchBtnId);
    userEvent.type(searchInput, 'chicken');
    userEvent.click(searchButton);
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52977'));
  });

  test('Teste dos drinks', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => ({
        drinks: [
          {
            idDrink: '52977',
            strDrink: 'Corba',
            strDrinkThumb: 'https://www.themealdb.com/images/media/drink/58oia61564916529.jpg',
          },
        ],
      }),
    }));
    const { history } = renderWithRouter(<SearchBar />);
    const searchInput = screen.getByTestId(search2InputId);
    const searchButton = screen.getByTestId(execSearchBtnId);
    userEvent.type(searchInput, 'cocktail');
    userEvent.click(searchButton);
    await waitFor(() => expect(history.location.pathname).toBe('/drinks/52977'));
  });

  test('Teste vazio', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => ({
        drinks: [],
      }),
    }));
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    renderWithRouter(<SearchBar />);
    const searchInput = screen.getByTestId(search2InputId);
    const searchButton = screen.getByTestId(execSearchBtnId);
    userEvent.type(searchInput, 'cocktail');
    userEvent.click(searchButton);
    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  });
});
