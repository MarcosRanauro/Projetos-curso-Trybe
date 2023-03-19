import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const headingElement = screen.getByRole('heading', {
      level: 2,
      name: /Encountered Pokémon/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextPokemonBttn = screen.getByRole('button', {
      name: /Próximo Pokémon/i,
    });
    userEvent.click(nextPokemonBttn);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    userEvent.click(nextPokemonBttn);
    expect(screen.getByText('Caterpie')).toBeInTheDocument();
    userEvent.click(nextPokemonBttn);
    expect(screen.getByText('Ekans')).toBeInTheDocument();
    userEvent.click(nextPokemonBttn);
    expect(screen.getByText('Alakazam')).toBeInTheDocument();
    userEvent.click(nextPokemonBttn);
    expect(screen.getByText('Mew')).toBeInTheDocument();
    userEvent.click(nextPokemonBttn);
    expect(screen.getByText('Rapidash')).toBeInTheDocument();
    userEvent.click(nextPokemonBttn);
    expect(screen.getByText('Snorlax')).toBeInTheDocument();
    userEvent.click(nextPokemonBttn);
    expect(screen.getByText('Dragonair')).toBeInTheDocument();
    userEvent.click(nextPokemonBttn);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Electric' }));
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();

    const typeFilter = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(typeFilter[1]);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    userEvent.click(typeFilter[2]);
    expect(screen.getByText('Caterpie')).toBeInTheDocument();
    userEvent.click(typeFilter[3]);
    expect(screen.getByText('Ekans')).toBeInTheDocument();
    userEvent.click(typeFilter[4]);
    expect(screen.getByText('Alakazam')).toBeInTheDocument();
    userEvent.click(typeFilter[5]);
    expect(screen.getByText('Snorlax')).toBeInTheDocument();
    userEvent.click(typeFilter[6]);
    expect(screen.getByText('Dragonair')).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();

    const allBttn = screen.getByRole('button', { name: 'All' });
    userEvent.click(allBttn);
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
  });
});
