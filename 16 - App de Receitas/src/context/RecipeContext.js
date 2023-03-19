import { createContext } from 'react';

const RecipeContext = createContext({
  mealsRecipes: [],
  drinksRecipes: [],
  setMealsRecipes: () => {},
  setDrinksRecipes: () => {},
});
export default RecipeContext;
