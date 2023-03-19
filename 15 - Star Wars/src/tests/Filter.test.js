import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from '../helpers/mockData';
import App from '../App';

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockImplementation(() => mockData),
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Teste dos filtros da aplicação',  () => {

	test('2.1 - Testa se os filtros iniciais funcionam corretamente', async () => {
    render(<App />);
		expect(await screen.findByText(/alderaan/i)).toBeInTheDocument();

    userEvent.type(screen.queryByTestId(/name-filter/i), "oo");
    expect(screen.queryByText(/alderaan/i)).not.toBeInTheDocument();

	});

  test('2.2 - Testa os filtros de comparação!', () => {
    render(<App />);

    const valueFilter = screen.queryByTestId(/value-filter/i);
    const columnFilter = screen.queryByTestId(/column-filter/i);
    const comparisonFilter = screen.queryByTestId(/comparison-filter/i);

    userEvent.selectOptions(columnFilter, "population");
    userEvent.selectOptions(comparisonFilter, "maior que");
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, "100000");
    userEvent.click(screen.queryByTestId(/button-filter/i));

    const oneFilter = screen.queryByText(/population maior que 100000/i);
    expect(oneFilter).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, "orbital_period");
    userEvent.selectOptions(comparisonFilter, "menor que");
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, "400");
    userEvent.click(screen.queryByTestId(/button-filter/i));

    const twoFilter = screen.queryByText(/orbital_period menor que 400/i);
    expect(twoFilter).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, "diameter");
    userEvent.selectOptions(comparisonFilter, "igual a");
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, "368");
    userEvent.click(screen.queryByTestId(/button-filter/i));

    const threeFilter = screen.queryByText(/diameter igual a 368/i);
    expect(threeFilter).toBeInTheDocument();

});

  test('2.3 - Testa o botão de remover todos os filtros', () => {
      render(<App />);

    const valueFilter = screen.queryByTestId(/value-filter/i);
    const columnFilter = screen.queryByTestId(/column-filter/i);
    const comparisonFilter = screen.queryByTestId(/comparison-filter/i);

    userEvent.selectOptions(columnFilter, "population");
    userEvent.selectOptions(comparisonFilter, "maior que");
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, "100000");
    userEvent.click(screen.queryByTestId(/button-filter/i));

    const oneFilter = screen.queryByText(/population maior que 100000/i);
    expect(oneFilter).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, "orbital_period");
    userEvent.selectOptions(comparisonFilter, "maior que");
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, "400");
    userEvent.click(screen.queryByTestId(/button-filter/i));

    const twoFilter = screen.queryByText(/orbital_period maior que 400/i);
    expect(twoFilter).toBeInTheDocument();

    userEvent.click(screen.queryByRole("button", { name: /Remover todos os filtros/i }));
    expect(oneFilter).not.toBeInTheDocument();
    expect(twoFilter).not.toBeInTheDocument();
  });

  test("2.4 - Verifica se o filtro de valores numéricos é removido após clicar no botão 'X'", () => {
    render(<App />);

    const valueFilter = screen.queryByTestId(/value-filter/i);

    userEvent.selectOptions(
      screen.queryByTestId(/column-filter/i),
      "population"
    );
    userEvent.selectOptions(
      screen.queryByTestId(/comparison-filter/i),
      "maior que"
    );
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, "1000");
    userEvent.click(screen.queryByTestId(/button-filter/i));

    const filter = screen.queryByText(/population maior que 1000/i);
    expect(filter).toBeInTheDocument();

    userEvent.click(screen.queryByRole("button", { name: /x/i }));
    expect(filter).not.toBeInTheDocument();
  });

})
