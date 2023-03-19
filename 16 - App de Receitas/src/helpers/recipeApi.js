// helpers/api.js

export const fetchRecipe = async (id) => {
  try {
    const mealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const mealData = await mealResponse.json();
    return mealData.meals[0];
  } catch (error) {
    const drinkResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const drinkData = await drinkResponse.json();
    return drinkData.drinks[0];
  }
};
