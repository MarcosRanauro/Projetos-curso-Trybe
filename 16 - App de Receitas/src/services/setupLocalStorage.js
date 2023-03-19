export const userLocalStorage = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
};

export const saveFavoriteRecipe = (recipe) => {
  const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  savedRecipes.push(recipe);
  localStorage.setItem('favoriteRecipes', JSON.stringify(savedRecipes));
};

export const getFavoriteRecipes = () => {
  const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  return savedRecipes;
};
