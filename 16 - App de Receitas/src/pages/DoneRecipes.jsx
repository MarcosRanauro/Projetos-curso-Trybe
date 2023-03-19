import { React, useState } from 'react';
import copy from 'clipboard-copy';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Share from '../images/shareIcon.svg';
import './styles/DoneRecipes.css';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  return (
    <div>
      <h1>DoneRecipes</h1>
      <Header />
      <div>
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Meals</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      <div>
        {doneRecipes.map((recipe, index) => (
          <div key={ index }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt="recipe"
            />
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}`}

            </p>
            <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              onClick={ () => {
                copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                setIsLinkCopied(true);
              } }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ Share }
                alt="share icon"
              />
            </button>
            <div
              className={ `link-copied-message ${isLinkCopied
                ? '' : 'hidden'}` }
            >
              Link copied!
            </div>
            {recipe.tags ? recipe.tags.map((tag, i) => {
              console.log(tag); // <--- console.log adicionado aqui
              return (
                <span
                  key={ i }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </span>
              );
            }) : null}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
