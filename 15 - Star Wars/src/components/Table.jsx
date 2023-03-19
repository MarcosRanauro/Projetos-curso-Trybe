import { useState, useContext, useEffect } from 'react';
import ApiContext from '../context/ApiContext';
import './Table.css';

function Table() {
  const [data, setData] = useState([]);
  const [firstItem = {}] = data;
  const headers = Object.keys(firstItem);
  const { filteredPlanets } = useContext(ApiContext);
  useEffect(() => {
    setData(filteredPlanets);
  }, [filteredPlanets]);
  return (
    <table>
      <thead>
        <tr>
          { headers.map((item) => <th key={ item }>{item}</th>) }
        </tr>
      </thead>
      <tbody>
        { data.map((planet) => {
          const values = Object.values(planet);
          return (
            <tr key={ planet.name }>
              { values.map((item) => <td key={ item }>{item}</td>) }
            </tr>
          );
        }) }
      </tbody>
    </table>
  );
}

export default Table;
