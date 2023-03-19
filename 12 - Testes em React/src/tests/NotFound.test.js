import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('erro-404'); });
    screen.getByRole('heading', {
      level: 2, name: /Page requested not found/i,
    });
  });

  test('Teste se a página mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('./erro-404'));

    const img = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
