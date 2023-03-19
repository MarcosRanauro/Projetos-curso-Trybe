import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ApiContext from './ApiContext';

function ApiProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [numericFilters, setNumericFilters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const planetsData = data.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanets(planetsData);
      setFilteredPlanets(planetsData);
    }
    fetchData();
  }, []);

  function nameFilter(text) {
    const regex = new RegExp(`${text}`, 'i');
    setFilteredPlanets(planets.filter((item) => item.name.match(regex)));
  }

  useEffect(() => {
    let newPlanets = planets;
    numericFilters.forEach((element) => {
      if (element.type === 'maior que') {
        newPlanets = newPlanets
          .filter((item) => Number(element.number) < Number(item[element.column]));
      } else if (element.type === 'menor que') {
        newPlanets = newPlanets
          .filter((item) => Number(element.number) > Number(item[element.column]));
      } else if (element.type === 'igual a') {
        newPlanets = newPlanets
          .filter((item) => Number(element.number) === Number(item[element.column]));
      }
    });
    setFilteredPlanets(newPlanets);
  }, [numericFilters, planets]);

  function numericFilter(column, type, number) {
    setNumericFilters([...numericFilters, { column, type, number }]);
  }

  function deleteNumericFilter(column) {
    setNumericFilters(numericFilters.filter((item) => item.column !== column));
  }

  function deleteAllNumericFilters() {
    setNumericFilters([]);
  }

  return (
    <ApiContext.Provider
      value={
        {
          filteredPlanets,
          nameFilter,
          numericFilter,
          numericFilters,
          deleteNumericFilter,
          deleteAllNumericFilters }
      }
    >
      {children}
    </ApiContext.Provider>
  );
}
ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ApiProvider;
