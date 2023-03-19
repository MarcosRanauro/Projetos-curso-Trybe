import React, { useEffect, useState, useContext } from 'react';
import RecipeContext from '../context/RecipeContext';
import all from '../styles/All.png';
import beef from '../styles/beef.png';
import goat from '../styles/goat.png';
import chicken from '../styles/chicken.png';
import breakfast from '../styles/breakfast.png';
import dessert from '../styles/dessert.png';

function BttMealsCategory() {
  const [mealsCategory, setMealsCategory] = useState([]);
  const { setMealsRecipes } = useContext(RecipeContext);
  const [currCategory, setcurrCategory] = useState(' ');

  useEffect(() => {
    const fetchMealsfunction = async () => {
      try {
        const resp = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const mealsCategorys = await resp.json();
        const number = 5;
        const test = mealsCategorys.meals
          .slice(0, number).map((category) => category.strCategory);
        setMealsCategory(test);
      } catch (error) {
        console.error(error.message); //  fetch( `www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      }
    };
    fetchMealsfunction();
  }, []);

  const array = [beef, breakfast, chicken, dessert, goat];

  const handleALl = async () => {
    try {
      const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const mealsRecipe = await resp.json();
      const number = 12;
      const test = mealsRecipe.meals
        .slice(0, number);
      setMealsRecipes(test);
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
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const mealsCategorys = await res.json();
      const number = 12;
      const test = mealsCategorys.meals
        .slice(0, number);
      setMealsRecipes(test);
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
        { mealsCategory?.map((category, index) => (
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

export default BttMealsCategory;
