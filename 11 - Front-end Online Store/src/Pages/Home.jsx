import React from 'react';
import { Link } from 'react-router-dom';
import {
  getProductsFromCategoryAndQuery, getCategories, getProductFromQuery,
} from '../services/api';
import Products from '../Components/Products';
import Category from '../Components/Category';
import BttnCart from '../Components/BttnCart';

class Home extends React.Component {
  state = {
    query: '',
    results: {},
    categories: [],
  };

  componentDidMount() {
    this.handleCategories();
  }

  handleSearchText = ({ target }) => {
    this.setState({ query: target.value });
  };

  handleSearch = async () => {
    const { query } = this.state;
    const productData = await getProductFromQuery(query);
    this.setState({ results: productData.results });
  };

  handleCategories = async () => {
    const fetch = await getCategories();
    this.setState({
      categories: fetch,
    });
  };

  handleCategoriesProducts = async (id) => {
    const productData = await getProductsFromCategoryAndQuery(id);
    this.setState({ results: productData.results });
  };

  render() {
    const { results, categories } = this.state;
    return (
      <section>
        <div>
          <label htmlFor="search">
            Pesquisa:
            <input
              type="text"
              id="search"
              onChange={ this.handleSearchText }
              data-testid="query-input"
            />
          </label>
          <button
            type="button"
            onClick={ this.handleSearch }
            data-testid="query-button"
          >
            Pesquisar
          </button>
          <Link
            to="/Cart"
            data-testid="shopping-cart-button"
            { ...this.state }
          >
            Carrinho de compras
          </Link>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
        <Category
          categories={ categories }
          handleCategoriesProducts={ this.handleCategoriesProducts }
        />
        <div>
          {results.length > 0
            ? (
              results
                .map(({ price, title, thumbnail, id }, index) => (
                  <div key={ index }>
                    <Link
                      key={ index }
                      to={ `/Product/${id}` }
                      data-testid="product-detail-link"
                    >
                      <Products
                        data-testid="product"
                        key={ index }
                        price={ price }
                        title={ title }
                        thumbnail={ thumbnail }
                      />
                    </Link>
                    <BttnCart
                      price={ price }
                      title={ title }
                      id={ id }
                    />
                  </div>
                ))
            ) : <h3>Nenhum produto foi encontrado</h3>}
        </div>
      </section>
    );
  }
}

export default Home;
