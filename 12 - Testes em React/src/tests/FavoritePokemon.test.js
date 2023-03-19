import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemon.js />', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('./favorites'));

    const noFavorite = screen.getByText(/No favorite Pokémon found/i);
    expect(noFavorite).toBeInTheDocument();
  });

  test('Teste se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByText('More details');
    userEvent.click(moreDetails);

    const pokemonFavorite = screen.getByText('Pokémon favoritado?');
    userEvent.click(pokemonFavorite);

    const favoritePokemon = screen.getByText('Favorite Pokémon');
    userEvent.click(favoritePokemon);

    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
  });
});
