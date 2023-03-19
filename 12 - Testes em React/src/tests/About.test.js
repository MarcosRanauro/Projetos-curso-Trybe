import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <About.js />', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('./about'));

    const inf = screen.getByText(/This application simulates a Pokédex/i);
    expect(inf).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('./about'));

    const headingElement = screen.getByRole('heading', {
      level: 2, name: /About Pokédex/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('./about'));

    const firstParagraph = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/i);
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('./about'));

    const img = screen.getByRole('img', { name: /Pokédex/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
