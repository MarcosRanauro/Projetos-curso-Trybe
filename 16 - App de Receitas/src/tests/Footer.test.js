import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouter from './services/renderWithRouter';
import Profile from '../pages/Profile';

const DRINK_ID = 'drinks-bottom-btn';
const MEAL_ID = 'meals-bottom-btn';

describe('1. Testes no componente Footer', () => {
  it('1.2 Verifica se os ícones de Drinks e Meals estão presentes no footer', async () => {
    renderWithRouter(<Recipes />);

    expect(screen.getByTestId(DRINK_ID)).toBeInTheDocument();
    expect(screen.getByTestId(MEAL_ID)).toBeInTheDocument();
  });

  it('1.3 Verifica se o botão Drinks redireciona para a rota "/drinks"', async () => {
    const { history } = renderWithRouter(<Profile />);
    const drinkButton = screen.getByTestId(DRINK_ID);

    userEvent.click(drinkButton);

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/drinks');
    });
  });

  it('1.4 Verifica se o botão Meals redireciona para a rota "/meals"', async () => {
    const { history } = renderWithRouter(<Profile />);
    const mealButton = screen.getByTestId(MEAL_ID);

    userEvent.click(mealButton);

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/meals');
    });
  });
});
