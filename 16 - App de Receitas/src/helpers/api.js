function buildSearchUrl(searchTerm, searchType) {
  const baseUrl = window.location.pathname === '/meals'
    ? 'https://www.themealdb.com/api/json/v1/1/'
    : 'https://www.thecocktaildb.com/api/json/v1/1/';

  const searchOptions = {
    Ingredient: `filter.php?i=${encodeURIComponent(searchTerm)}`,
    Name: `search.php?s=${encodeURIComponent(searchTerm)}`,
    'First letter': `search.php?f=${encodeURIComponent(searchTerm)}`,
  };

  return baseUrl + searchOptions[searchType];
}

export default buildSearchUrl;
