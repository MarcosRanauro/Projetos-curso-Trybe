import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

const number = 12;
function DrinkInitialRecipes() {
  const { drinksRecipes, setDrinksRecipes } = useContext(RecipeContext);
  useEffect(() => {
    const fetchRecipesMealsfunction = async () => {
      try {
        const resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const drinkRecipe = await resp.json();
        const test = drinkRecipe.drinks
          .slice(0, number);
        setDrinksRecipes(test);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchRecipesMealsfunction();
  }, [setDrinksRecipes]);
  return (
    <div className="container-results">
      { drinksRecipes?.map((recipe, index) => (index < number && (
        <div key={ index } data-testid={ `${index}-recipe-card` } className="card">
          <Link to={ `/drinks/${recipe.idDrink}` }>
            <img
              src={ recipe.strDrinkThumb }
              alt="drink"
              data-testid={ `${index}-card-img` }
              className="img-result"
            />

          </Link>

          <p data-testid={ `${index}-card-name` } className="title-card">
            { recipe.strDrink }
          </p>
        </div>
      )))}
    </div>
  );
}

export default DrinkInitialRecipes;
