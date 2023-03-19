import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import Styles from './styles/Recommendations.module.css';

function MealsRecommendations() {
  const number = 6;
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
    <div className={ Styles.recommendations }>
      { mealsRecipes?.map((recipe, index) => (index < number && (
        <div
          key={ index }
          data-testid={ `${index}-recommendation-card` }
          className={ Styles.card }
        >
          <div className={ Styles.image }>
            <Link to={ `/meals/${recipe.idMeal}` }>
              <img
                src={ recipe.strMealThumb }
                alt="meals"
                data-testid={ `${index}-card-img` }
                className={ Styles.img }
              />
            </Link>
          </div>
          <div className={ Styles.title }>
            <h2 data-testid={ `${index}-recommendation-title` }>
              { recipe.strMeal }
            </h2>
          </div>
        </div>
      )))}
    </div>
  );
}

export default MealsRecommendations;
