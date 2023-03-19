import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Category extends Component {
  render() {
    const { categories, handleCategoriesProducts } = this.props;
    return (
      <div>
        {categories.map(({ id, name }) => (
          <button
            data-testid="category"
            type="button"
            key={ id }
            onClick={ () => handleCategoriesProducts(id) }
          >
            { name }
          </button>
        ))}
      </div>
    );
  }
}

export default Category;

Category.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  handleCategoriesProducts: PropTypes.func.isRequired,
};
