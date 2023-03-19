import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('1.1 - Testando o App', () => {

  test('Testes inicias da aplicação', () => {
    render(<App />);

    const title = screen.getByRole('heading', {
      name: /Projeto Star Wars - Trybe/i
    });
    expect(title).toBeInTheDocument();
  });
})

