import React, { useEffect, useState, useContext } from 'react';
import RecipeContext from '../context/RecipeContext';
import all from '../styles/AllDrink.png';
import drink from '../styles/drink.png';
import other from '../styles/other.png';
import shake from '../styles/shake.png';
import cocktail from '../styles/cocktail.png';
import cocoa from '../styles/cocoa.png';

function BttDrinksCategory() {
  const [drinksCategory, setDrinksCategory] = useState([]);
  const { setDrinksRecipes } = useContext(RecipeContext);
  const [currCategory, setcurrCategory] = useState(' ');

  useEffect(() => {
    const fetchDrinksfunction = async () => {
      try {
        const resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const drinkCategory = await resp.json();
        const number = 5;
        const test = drinkCategory.drinks
          .slice(0, number).map((category) => category.strCategory);
        setDrinksCategory(test);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchDrinksfunction();
  }, []);

  const array = [drink, cocktail, shake, other, cocoa];

  const handleALl = async () => {
    try {
      const resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const drinkRecipe = await resp.json();
      const number = 12;
      const test = drinkRecipe.drinks
        .slice(0, number);
      setDrinksRecipes(test);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleClick = async (category) => {
    setcurrCategory(category);
    if (currCategory === category) {
      return handleALl();
    }
    try {
      const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const drinkCategorys = await res.json();
      const number = 12;
      const test = drinkCategorys.drinks
        .slice(0, number);
      setDrinksRecipes(test);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container-btt-meals">
      <div className="icons-search-meals">
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ handleALl }
          className="icon-recipes"
        >
          <img src={ all } alt="Ícones" />
        </button>
        { drinksCategory?.map((category, index) => (
          <button
            data-testid={ `${category}-category-filter` }
            key={ category }
            type="button"
            onClick={ () => handleClick(category) }
            className="icon-recipes"
          >
            <img src={ array[index] } alt="Ícones" />
          </button>
        )) }
      </div>
    </div>
  );
}

export default BttDrinksCategory;
