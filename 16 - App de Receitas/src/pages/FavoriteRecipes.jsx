import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [filter, setFilter] = useState('');
  const history = useHistory();

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavoriteRecipes(savedRecipes);
    setFilteredRecipes(savedRecipes);
  }, []);

  useEffect(() => {
    if (filter === '') {
      setFilteredRecipes(favoriteRecipes);
    } else {
      setFilteredRecipes(favoriteRecipes.filter((recipe) => recipe.type === filter));
    }
  }, [filter, favoriteRecipes]);

  const handleClick = (event) => {
    const { name } = event.target;
    setFilter(name);
    setLinkCopied(false);
  };

  const handleCopyLink = (id) => {
    const URL = `http://localhost:3000/${favoriteRecipes.find((recipe) => recipe.id === id).type}s/${id}`;
    copy(URL);
    setLinkCopied(true);
  };

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favoriteRecipes.filter((recipe) => recipe.id !== id);
    setFavoriteRecipes(updatedFavorites);
    setFilteredRecipes(updatedFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  };

  const handleRecipeClick = (id, type) => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <div>
      <Header pageTitle="Favorite Recipes" hasSearchIcon={ false } />
      <div>
        <button
          className={ filter === '' ? 'active' : 'notActive' }
          data-testid="filter-by-all-btn"
          name=""
          onClick={ handleClick }
        >
          All
        </button>
        <button data-testid="filter-by-meal-btn" name="meal" onClick={ handleClick }>
          Meals
        </button>
        <button data-testid="filter-by-drink-btn" name="drink" onClick={ handleClick }>
          Drinks
        </button>
      </div>
      {filteredRecipes.length > 0
        && filteredRecipes.map((recipe, index) => (
          <section key={ recipe.id }>
            <div
              onClick={ () => handleRecipeClick(recipe.id, recipe.type) }
              onKeyDown={ () => handleRecipeClick(recipe.id, recipe.type) }
              role="button"
              tabIndex={ 0 }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt=""
              />
              <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
            </div>
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot}
            </h3>
            <div>
              <span>{linkCopied && <p>Link copied!</p>}</span>
              <button onClick={ () => handleCopyLink(recipe.id) }>
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt=""
                />
              </button>
              <button onClick={ () => handleRemoveFavorite(recipe.id) }>
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt=""
                />
              </button>
            </div>
          </section>
        ))}
    </div>
  );
}
