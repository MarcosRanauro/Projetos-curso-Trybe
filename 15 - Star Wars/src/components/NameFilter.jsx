import { useContext } from 'react';
import ApiContext from '../context/ApiContext';
import './NameFilter.css';

function NameFilter() {
  const { nameFilter } = useContext(ApiContext);
  return (
    <div className="namefilter-container">
      <h1>Projeto Star Wars - Trybe</h1>
      <input
        type="text"
        placeholder="Pesquise um Planeta aqui!"
        name="nameFilter"
        data-testid="name-filter"
        onChange={ ({ target }) => nameFilter(target.value) }
      />
    </div>
  );
}

export default NameFilter;
