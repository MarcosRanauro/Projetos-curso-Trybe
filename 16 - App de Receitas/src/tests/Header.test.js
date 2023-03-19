import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './services/renderWithRouter';
import Header from '../components/Header';

describe('Testa o Header', () => {
  test('Verifica se existe um title com data-testid="page-title"', () => {
    renderWithRouter(<Header />);
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  test('Verifica se existe um botão de Profile com data-testid="profile-top-btn"', () => {
    renderWithRouter(<Header />);
    const profileBttn = screen.getByTestId('profile-top-btn');
    expect(profileBttn).toBeInTheDocument();
  });
  test('Verifica se existe um botão chamado de Search com data-testid="search-top-btn"', () => {
    renderWithRouter(<Header />);
    const searchBttn = screen.getByTestId('search-top-btn');
    expect(searchBttn).toBeInTheDocument();
  });
  test('Verifica se ao clicar no botão de Search renderiza um campo de pesquisa', () => {
    renderWithRouter(<Header />);
    const searchBttn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBttn);
    const inputSearch = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    expect(inputSearch).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    userEvent.click(searchBttn);
    expect(inputSearch).not.toBeInTheDocument();
  });
  test('Verifica se ao clicar no icone de Profile a pagina é redirecionada para tela de Profile', () => {
    const { history } = renderWithRouter(<Header />);
    const profileBttn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBttn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });
});
