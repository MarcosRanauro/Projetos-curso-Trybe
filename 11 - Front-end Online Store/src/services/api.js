export async function getCategories() {
  const urlBase = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(urlBase);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const urlCategory = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(urlCategory);
  const data = await response.json();
  return data;
}

export async function getProductById(id) {
  const urlById = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(urlById);
  const data = await response.json();
  return data;
}

export async function getProductFromQuery(query) {
  const urlFromQuerry = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(urlFromQuerry);
  const data = await response.json();
  return data;
}
