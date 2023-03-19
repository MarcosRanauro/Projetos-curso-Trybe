import React from 'react';
import PropTypes from 'prop-types';

class Products extends React.Component {
  render() {
    const { price, title, thumbnail } = this.props;
    return (
      <div data-testid="product">
        <h3>
          {title}
        </h3>
        <img src={ thumbnail } alt="Product " />
        <p>
          R$
          {price}
        </p>
      </div>
    );
  }
}
export default Products;

Products.propTypes = {
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};
