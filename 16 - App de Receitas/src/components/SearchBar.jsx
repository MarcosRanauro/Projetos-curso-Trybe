import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import buildSearchUrl from '../helpers/api';
import RecipeContext from '../context/RecipeContext';
import '../styles/SearchBar.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('Ingredient');
  const history = useHistory();
  const { setMealsRecipes, setDrinksRecipes } = useContext(RecipeContext);

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearchTypeChange(event) {
    setSearchType(event.target.value);
  }

  function handleSearchResults(data) {
    const { meals } = data;
    const { drinks } = data;

    if ((meals && meals.length === 1) || (drinks && drinks.length === 1)) {
      const id = meals ? meals[0].idMeal : drinks[0].idDrink;
      const path = meals ? `/meals/${id}` : `/drinks/${id}`;
      history.push(path);
    } else if (!meals && !drinks) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setMealsRecipes(meals || drinks);
    setDrinksRecipes(drinks || meals);
  }

  function handleSearchButtonClick() {
    if (searchType === 'First letter' && searchTerm.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    const apiUrl = buildSearchUrl(searchTerm, searchType);

    fetch(apiUrl)
      .then((response) => response.json())
      .then(handleSearchResults);
  }

  return (
    <div className="search-container">
      <div className="container-input-search">
        <input
          type="text"
          data-testid="search-input"
          name="search-input"
          value={ searchTerm }
          onChange={ handleSearchTermChange }
          className="input-search"
        />
      </div>
      <div className="container-radio-search">
        <label>
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="search-type"
            value="Ingredient"
            checked={ searchType === 'Ingredient' }
            onChange={ handleSearchTypeChange }
            className="radio-input"
          />
          <span>Ingredient</span>
        </label>
        <label>
          <input
            type="radio"
            data-testid="name-search-radio"
            name="search-type"
            value="Name"
            checked={ searchType === 'Name' }
            onChange={ handleSearchTypeChange }
            className="radio-input"
          />
          <span>Name</span>
        </label>
        <label>
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="search-type"
            value="First letter"
            checked={
              searchType === 'First letter'
            }
            onChange={ handleSearchTypeChange }
            className="radio-input"
          />
          <span>First letter</span>
        </label>
      </div>
      <div className="container-btn-search">
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSearchButtonClick }
          className="btn-search"
        >
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
