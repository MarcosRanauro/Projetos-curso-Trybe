import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();

  const handleDrinksClick = () => {
    history.push('/drinks');
  };

  const handleMealsClick = () => {
    history.push('/meals');
  };

  return (
    <footer data-testid="footer">
      <button onClick={ handleDrinksClick } className="footer-btn">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Drink Icon" />
      </button>

      <button onClick={ handleMealsClick } className="footer-btn">
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="Meal Icon" />
      </button>
    </footer>
  );
}

export default Footer;
