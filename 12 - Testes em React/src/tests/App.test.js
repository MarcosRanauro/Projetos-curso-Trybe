import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <App.js />', () => {
  it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
  //! Primeira forma implementada

    // const { history } = renderWithRouter(<App />);

    // const homeElement = screen.getByText(/Home/i);
    // expect(homeElement).toBeInTheDocument();

    // userEvent.click(screen.getByText(/Home/i));
    // const { pathname } = history.location;
    // expect(pathname).toBe('/');

    //! Segunda forma implementada

    renderWithRouter(<App />);

    const homeElement2 = screen.getByRole('link', {
      name: /Home/i,
    });
    userEvent.click(homeElement2);
    screen.getByRole('heading', {
      level: 2, name: /Encountered Pokémon/i,
    });
  });

  it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
  //! Primeira forma implementada

    // const { history } = renderWithRouter(<App />);

    // const AboutElement = screen.getByText(/About/i);
    // expect(AboutElement).toBeInTheDocument();

    // userEvent.click(screen.getByText(/About/i));
    // const { pathname } = history.location;
    // expect(pathname).toBe('/about');

    //! Segunda forma implementada

    renderWithRouter(<App />);

    const AboutElement2 = screen.getByRole('link', {
      name: /About/i,
    });
    userEvent.click(AboutElement2);
    screen.getByRole('heading', {
      level: 2, name: /About Pokédex/i,
    });
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
  //! Primeira forma implementada

    // const { history } = renderWithRouter(<App />);

    // const favoriteElement = screen.getByText(/Favorite Pokémon/i);
    // expect(favoriteElement).toBeInTheDocument();

    // userEvent.click(screen.getByText(/Favorite Pokémon/i));
    // const { pathname } = history.location;
    // expect(pathname).toBe('/favorites');

    //! Segunda forma implementada

    renderWithRouter(<App />);

    const favoriteElement2 = screen.getByRole('link', {
      name: /Favorite Pokémon/i,
    });
    userEvent.click(favoriteElement2);
    screen.getByRole('heading', {
      level: 2, name: /Favorite Pokémon/i,
    });
  });

  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('erro-404'); });

    screen.getByRole('heading', {
      level: 2, name: /Page requested not found/i,
    });
  });
});
