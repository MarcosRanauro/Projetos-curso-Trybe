import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function RecipeProvider({ children }) {
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [drinksRecipes, setDrinksRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);

  const context = useMemo(() => ({
    mealsRecipes,
    setMealsRecipes,
    drinksRecipes,
    setDrinksRecipes,
    searchResults,
    setSearchResults,
    recipe,
    setRecipe,
    ingredientList,
    setIngredientList,
  }), [mealsRecipes,
    setMealsRecipes,
    drinksRecipes,
    setDrinksRecipes,
    searchResults,
    setSearchResults,
    recipe,
    setRecipe,
    ingredientList,
    setIngredientList]);

  return (
    <RecipeContext.Provider value={ context }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
