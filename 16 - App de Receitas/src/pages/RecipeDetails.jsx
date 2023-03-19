import React, { useEffect, useContext } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipeContext from '../context/RecipeContext';
import Footer from '../components/Footer';
import { fetchRecipe } from '../helpers/recipeApi';
import styles from './styles/RecipeDetails.module.css';
import MealsRecommendations from '../components/MealsRecommendations';
import DrinksRecommendations from '../components/DrinksRecommendations';
import Share from '../images/shareIcon.svg';
import { saveFavoriteRecipe } from '../services/setupLocalStorage';
import '../styles/RecipeDetails.css';

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = useHistory();
  const { params } = useRouteMatch();
  const { recipe, setRecipe } = useContext(RecipeContext);
  const { ingredientList, setIngredientList } = useContext(RecipeContext);

  useEffect(() => {
    const getRecipe = async () => {
      const resultRecipe = await fetchRecipe(params.id);
      setRecipe(resultRecipe);
    };
    getRecipe();
  }, [params.id, setRecipe]);

  useEffect(() => {
    if (recipe) {
      const ingredients = [];
      const n = 20;
      for (let i = 1; i <= n; i += 1) {
        if (recipe[`strIngredient${i}`]) {
          ingredients.push(
            `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`,
          );
        } else {
          break;
        }
      }
      setIngredientList(ingredients);
    }
  }, [recipe]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const saveLocalStorage = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      drinks: {},
      meals: {},
    };
    const type = pathname.split('/')[1];
    const recipes = { ...inProgressRecipes,
      [type]: {
        ...inProgressRecipes[type],
        [recipe.idMeal || recipe.idDrink]: [
          ...ingredientList,
        ],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipes));
  };

  const handleClick = () => {
    const isMealPage = history.location.pathname.includes('/meals');
    saveLocalStorage();

    if (isMealPage) {
      history.push(`/meals/${recipe.idMeal}/in-progress`);
    } else {
      history.push(`/drinks/${recipe.idDrink}/in-progress`);
    }
  };

  const handleShare = (event) => {
    event.preventDefault();
    const time = 2000;
    copy(`http://localhost:3000${pathname}`);
    const sucessMEssage = document.getElementById('sucess-message');
    sucessMEssage.style.display = 'block';

    setTimeout(() => {
      sucessMEssage.style.display = 'none';
    }, time);
  };

  const {
    idMeal,
    idDrink,
    strMeal,
    strDrink,
    strCategory,
    strInstructions,
    strMealThumb,
    strDrinkThumb,
    strAlcoholic,
    strYoutube,
    strArea,
  } = recipe;

  const handleShareClick = () => {
    const isMeal = history.location.pathname.includes('/meals');
    const newFavorite = {
      id: idMeal || idDrink,
      type: isMeal ? 'meal' : 'drink',
      nationality: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink,
      image: strMealThumb || strDrinkThumb,
    };
    saveFavoriteRecipe(newFavorite);
  };

  const isDrink = !!strDrink; // verifica se a receita é uma bebida
  const isAlcoholic = strAlcoholic === 'Alcoholic'; // verifica se a bebida é alcoólica

  return (
    <div className="container-details">
      <div className="container-img-details">
        <img
          src={ strMealThumb || strDrinkThumb }
          alt={ strMeal || strDrink }
          data-testid="recipe-photo"
          className="img-details"
        />
        <h1 data-testid="recipe-title">{strMeal || strDrink}</h1>
        <h3 data-testid="recipe-category">{strCategory}</h3>
        {isDrink && isAlcoholic && strAlcoholic && (
          <h3 data-testid="recipe-category">{strAlcoholic}</h3>
        )}
      </div>
      <ul>
        {ingredientList.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      {!isDrink && strYoutube && strYoutube.includes('=') && (
        <iframe
          data-testid="video"
          src={ `https://www.youtube.com/embed/${strYoutube.split('=')[1]}` }
          title={ strMeal }
          frameBorder="0"
          allow="accelerometer;
        autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      <div>
        {pathname.includes('/meals')
          ? <DrinksRecommendations />

          : <MealsRecommendations />}
        <button
          data-testid="start-recipe-btn"
          className={ styles.button }
          onClick={ handleClick }
        >
          Start Recipes
        </button>
        <button
          data-testid="share-btn"
          onClick={ handleShare }
        >
          <img
            src={ Share }
            alt="share-bttn"
            name="btnShare"
            data-testid="share-bttn"
          />
        </button>
        <div id="sucess-message" style={ { display: 'none' } }>Link copied!</div>
        <button
          data-testid="favorite-btn"
          onClick={ handleShareClick }
        >
          Favoritar
        </button>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default RecipeDetails;
