export const fetchProduct = async (product) => {
  if (!product) {
    throw new Error('ID não informado');
  }
  const getProduct = await fetch(`https://api.mercadolibre.com/items/${product}`);
  const data = getProduct.json();
  return data;
};

export const fetchProductsList = async (productList) => {
  if (typeof productList === 'undefined') {
    throw new Error('Termo de busca não informado');
  }
  const products = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${productList}`);
  const productsList = await products.json();
  return productsList.results;
};
