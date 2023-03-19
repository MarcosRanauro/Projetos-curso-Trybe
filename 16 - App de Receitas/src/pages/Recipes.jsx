import React from 'react';
import { useHistory } from 'react-router-dom';
import DrinkInitalRecipes from '../components/DrinkInitalRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MealsInitialRecipes from '../components/MealsInitialRecipes';
import BttDrinksCategory from '../components/BttDrinksCategory';
import BttMealsCategory from '../components/BttMealsCategory';
// import RecipeInProgress from './RecipeInProgress';

export default function Recipes() {
  const { location: { pathname } } = useHistory();
  return (
    <div>
      <Header />
      {pathname === '/meals'
        ? <BttMealsCategory />

        : <BttDrinksCategory />}
      {pathname === '/meals'
        ? <MealsInitialRecipes />

        : <DrinkInitalRecipes />}
      {/* <RecipeInProgress /> */}
      <Footer />
    </div>
  );
}
