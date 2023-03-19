import { useContext, useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import { fetchRecipe } from '../helpers/recipeApi';
import './styles/RecipeInProgress.css';

function RecipeInProgress() {
  const {
    recipe,
    setRecipe,
    ingredientList,
    setIngredientList,
  } = useContext(RecipeContext);
  const { params } = useRouteMatch();
  const [completeIngredients, setCompleteIngredients] = useState([]);
  const history = useHistory();

  const handleClick = () => {
    const isMeal = history.location.pathname.includes('/meals');
    const recipeId = isMeal ? recipe.idMeal : recipe.idDrink;
    const finishedRecipe = {
      id: recipeId,
      nationality: recipe.strArea || '',
      name: recipe.strMeal || recipe.strDrink,
      category: recipe.strCategory,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      tags: recipe.strTags ? recipe.strTags.trim().split(',') : [],
      alcoholicOrNot: recipe.strAlcoholic || '',
      type: isMeal ? 'meal' : 'drink',
      doneDate: new Date(Date.now()).toISOString(),
    };
    const storedRecipes = localStorage.getItem('doneRecipes');
    const parsedRecipes = storedRecipes ? JSON.parse(storedRecipes) : [];
    const updatedRecipes = [...parsedRecipes, finishedRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(updatedRecipes));
    history.push('/done-recipes');
  };

  const handleIngredientCheck = (index) => {
    const ingredientLabel = document.getElementById(`ingredient-${index}`);
    ingredientLabel.classList.toggle('completed');
    ingredientLabel.classList.toggle('incomplete');
    const newCompleteIngredients = [...completeIngredients];
    newCompleteIngredients[index] = !newCompleteIngredients[index];
    setCompleteIngredients(newCompleteIngredients);

    // Save the updated list of completed ingredients to localStorage
    const isMeal = history.location.pathname.includes('/meals');
    const recipeId = isMeal ? recipe.idMeal : recipe.idDrink;
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    inProgressRecipes[recipeId] = {
      ...inProgressRecipes[recipeId],
      [index]: newCompleteIngredients[index],
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

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

      // Check if there are any completed ingredients saved for this recipe in localStorage
      const isMeal = history.location.pathname.includes('/meals');
      const recipeId = isMeal ? recipe.idMeal : recipe.idDrink;
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
      || {};
      const savedCompleteIngredients = inProgressRecipes[recipeId] || {};
      const newCompleteIngredients = ingredients.map(
        (_, index) => !!savedCompleteIngredients[index],
      );
      setCompleteIngredients(newCompleteIngredients);
    }
  }, [recipe, setIngredientList, history.location.pathname]);

  const allIngredientsCompleted = completeIngredients.every((completed) => completed);

  return (
    <div>
      <img src="" alt="" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">RecipeInProgress</h1>

      {ingredientList && ingredientList.map((element, index) => (
        <label
          data-testid={ `${index}-ingredient-step` }
          key={ index }
          id={ `ingredient-${index}` }
          className={ completeIngredients[index] ? 'completed' : 'incomplete' }
        >
          {element}
          <input
            type="checkbox"
            value={ element }
            onChange={ () => handleIngredientCheck(index) }
            checked={ completeIngredients[index] }
          />
        </label>
      ))}
      <label htmlFor="compartilhar">
        <button data-testid="share-btn" name="compartilhar">
          compartilhar
        </button>
      </label>
      <label htmlFor="favorite">
        <button data-testid="favorite-btn" name="favorite">
          favoritar
        </button>
      </label>
      <label htmlFor="">
        <input type="text" data-testid="recipe-category" />
      </label>
      <p data-testid="instructions" />
      <label htmlFor="finish">
        <button
          data-testid="finish-recipe-btn"
          name="finish"
          type="button"
          disabled={ !allIngredientsCompleted }
          onClick={ handleClick }
        >
          finalizar
        </button>
      </label>
    </div>
  );
}
export default RecipeInProgress;
