import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import Profile from '../images/profileIcon.svg';
import Search from '../images/searchIcon.svg';
import IconeRecipes from '../styles/icone-recipes-app.png';
import RecipesApp from '../styles/recipes-app.png';
import Meals from '../styles/icone-comida.png';
import Drinks from '../styles/icone-bebida.png';
import '../styles/Header.css';

function Header() {
  const history = useHistory();
  const { location: { pathname } } = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const shouldRender = () => {
    const allowedPages = ['/profile', '/done-recipes', '/favorite-recipes'];
    return !allowedPages.includes(pathname);
  };

  const title = () => {
    const path = pathname.split('/')[1].split('-');
    return path.reduce((acc, curr) => (
      `${acc} ${curr.split('')
        .map((letter, index) => (index ? letter : letter.toUpperCase()))
        .join('')}`
    ), '');
  };

  const handleProfileClick = () => {
    history.push('/profile');
  };

  const handleSearchClick = () => {
    setShowSearchBar((prevState) => !prevState);
  };

  return (
    <div className="header-container">
      <div className="header-one">
        <div className="container-icone-one">
          <img src={ IconeRecipes } alt="logo" className="icone-recipes" />
          <img src={ RecipesApp } alt="logo nome" className="recipes-app" />
        </div>
        <div className="container-icone-two">
          { shouldRender() && (
            <button onClick={ handleSearchClick } className="btn-header">
              <img
                src={ Search }
                alt="search"
                name="searchBtn"
                data-testid="search-top-btn"
                className="img-header"
              />
            </button>
          )}
          <button
            type="button"
            onClick={ handleProfileClick }
            className="btn-header"
          >
            <img
              src={ Profile }
              alt="profile"
              name="btnProfile"
              data-testid="profile-top-btn"
              className="img-header"
            />
          </button>
        </div>
      </div>
      <div className="header-two">
        <img
          src={ pathname === '/meals' ? Meals : Drinks }
          alt="Ícone comida"
          className="img-food"
        />
        <h1 data-testid="page-title" className="page-title">
          { title() }
        </h1>
      </div>
      { showSearchBar && (
        <SearchBar data-testid="search-input" />
      )}
    </div>
  );
}

export default Header;
