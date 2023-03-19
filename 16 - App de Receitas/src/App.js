import React from 'react';
import './App.css';
import Routes from './components/Routes';
import RecipeProvider from './context/RecipeProvider';

function App() {
  return (
    <div className="app">
      <RecipeProvider>
        <Routes />
      </RecipeProvider>

    </div>
  );
}

export default App;
