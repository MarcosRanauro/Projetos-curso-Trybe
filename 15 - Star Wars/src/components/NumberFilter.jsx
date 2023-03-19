import { useContext, useState, useEffect } from 'react';
import ApiContext from '../context/ApiContext';
import './NumberFilter.css';

function NumberFilter() {
  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [column, setColumn] = useState(columns[0]);
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const { numericFilter, numericFilters } = useContext(ApiContext);
  const { deleteNumericFilter, deleteAllNumericFilters } = useContext(ApiContext);

  useEffect(() => {
    setColumn(columns[0]);
  }, [columns]);

  return (
    <div>
      { numericFilters.map((item) => (
        <div key={ item.type } data-testid="filter">
          <p>
            {item.column}
            {' '}
            {item.type}
            {' '}
            {item.number}
          </p>
          <button
            type="button"
            data-testid="delete-onefilter"
            onClick={ () => {
              setColumns([...columns, item.column]);
              deleteNumericFilter(item.column);
            } }
          >
            X

          </button>
        </div>
      )) }
      <div className="numberfilter-container">
        <select
          name="columnFilter"
          id="column-filter"
          data-testid="column-filter"
          onChange={ ({ target }) => setColumn(target.value) }
          value={ column }
        >
          { columns.map((item, index) => <option key={ item + index }>{ item }</option>) }

        </select>
        <select
          name="comparisonFilter"
          id="comparison-filter"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ ({ target }) => setComparison(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          name="valueFilter"
          id="value-filter"
          data-testid="value-filter"
          value={ number }
          onChange={ ({ target }) => setNumber(target.value) }
        />
        <button
          data-testid="button-filter"
          onClick={ () => {
            setColumns(columns.filter((item) => item !== column));
            numericFilter(column, comparison, number);
          } }
        >
          Filtrar

        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => {
            setColumns([
              'population',
              'orbital_period',
              'diameter',
              'rotation_period',
              'surface_water',
            ]);
            deleteAllNumericFilters();
          } }
        >
          Remover todos os filtros

        </button>
      </div>
    </div>
  );
}

export default NumberFilter;
