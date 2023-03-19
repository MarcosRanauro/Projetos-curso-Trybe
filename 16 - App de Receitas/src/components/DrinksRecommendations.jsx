import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import Styles from './styles/Recommendations.module.css';

function DrinksRecommendations() {
  const number = 6;
  const { drinksRecipes, setDrinksRecipes } = useContext(RecipeContext);
  useEffect(() => {
    const fetchRecipesDrinksfunction = async () => {
      try {
        const resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const drinksRecipe = await resp.json();
        const test = drinksRecipe.drinks
          .slice(0, number);
        setDrinksRecipes(test);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchRecipesDrinksfunction();
  }, [setDrinksRecipes]);
  return (
    <div className={ Styles.recommendations }>
      { drinksRecipes?.map((recipe, index) => (index < number && (
        <div
          key={ index }
          data-testid={ `${index}-recommendation-card` }
          className={ Styles.card }
        >
          <div className={ Styles.image }>
            <Link to={ `/drinks/${recipe.idDrink}` }>
              <img
                src={ recipe.strDrinkThumb }
                alt="drink"
                data-testid={ `${index}-card-img` }
                className={ Styles.img }
              />
            </Link>
          </div>
          <div className={ Styles.title }>
            <h2 data-testid={ `${index}-recommendation-title` }>
              { recipe.strDrink }
            </h2>
          </div>
        </div>
      )))}
    </div>
  );
}

export default DrinksRecommendations;
