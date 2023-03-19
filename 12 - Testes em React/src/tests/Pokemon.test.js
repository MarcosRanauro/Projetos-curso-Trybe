import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémo', () => {
    renderWithRouter(<App />);

    const img = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');

    expect(img.alt).toBe('Pikachu sprite');
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(/Pikachu/i);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(/Electric/i);
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(/Average weight: 6.0 kg/i);
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/i });
    expect(link).toHaveAttribute('href', '/pokemon/25');
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /More details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    expect(screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    }));
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /More Details/i }));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);
    expect(screen.getByText(/Pokémon favoritado/i));
    const checkbox = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
    userEvent.click(checkbox);
    const img = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('http://localhost/star-icon.svg');
    expect(img.alt).toBe('Pikachu is marked as favorite');
  });
});
