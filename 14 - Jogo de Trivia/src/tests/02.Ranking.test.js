import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';

describe('Componente Ranking', () => {
    test('renderizar o componente sem erros', () => {
        const { getByTestId } = renderWithRouterAndRedux(<Ranking history={{ push: () => {} }} />);
        const Title = getByTestId('ranking-title');
        expect(Title).toBeInTheDocument();
    });

    test('renderizar o botão de login', () => {
        const { getByTestId } = renderWithRouterAndRedux(<Ranking history={{ push: () => {} }} />);
        const Home = getByTestId('btn-go-home')
        expect(Home).toBeInTheDocument;
        expect(Home).toHaveTextContent(/Login page/i);
    });
    
    test('Ir para página de Login quando o botão é clicado', () => {
        const historyMock = { push: jest.fn() };
        const { getByTestId } = renderWithRouterAndRedux(<Ranking history={historyMock} />);
        const Home = getByTestId('btn-go-home');
        fireEvent.click(Home);
        expect(historyMock.push).toHaveBeenCalledWith('./');
    });
});