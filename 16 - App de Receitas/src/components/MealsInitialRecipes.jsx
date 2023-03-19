import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

const number = 12;
function MealsInitialRecipes() {
  const { mealsRecipes, setMealsRecipes } = useContext(RecipeContext);
  useEffect(() => {
    const fetchRecipesMealsfunction = async () => {
      try {
        const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const mealsRecipe = await resp.json();
        const test = mealsRecipe.meals
          .slice(0, number);
        setMealsRecipes(test);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchRecipesMealsfunction();
  }, [setMealsRecipes]);
  return (
    <div className="container-results">
      { mealsRecipes?.map((recipe, index) => (index < number && (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
          className="card"
        >
          <Link to={ `/meals/${recipe.idMeal}` }>
            <img
              src={ recipe.strMealThumb }
              alt="meals"
              data-testid={ `${index}-card-img` }
              className="img-result"
            />
          </Link>

          <p data-testid={ `${index}-card-name` } className="title-card">
            { recipe.strMeal }
          </p>
        </div>
      )))}
    </div>
  );
}

export default MealsInitialRecipes;
