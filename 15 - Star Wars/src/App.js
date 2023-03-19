import React from 'react';
import NameFilter from './components/NameFilter';
import NumberFilter from './components/NumberFilter';
import Table from './components/Table';
import ApiProvider from './context/ApiProvider';
import './App.css';

function App() {
  return (
    <div className="container">
      <ApiProvider>
        <NameFilter />
        <NumberFilter />
        <Table />
      </ApiProvider>
    </div>
  );
}
export default App;
