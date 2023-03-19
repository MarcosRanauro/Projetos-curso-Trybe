import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes da página de login', () => {
  test('Testa se a página de login é renderizada', () => {
    const initialEntries = ['/'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const headerElement = screen.getByRole('heading', { level: 1, name: /TrybeWallet/i });
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const bttnInput = screen.getByRole('button', { name: /Entrar/i });

    expect(headerElement).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(bttnInput).toBeInTheDocument();
  });
});
