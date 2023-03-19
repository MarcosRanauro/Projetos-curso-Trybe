import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartList extends Component {
  state = {
    quantity: 1,
  };

  increaseQuantity = () => {
    this.setState(({ quantity }) => ({
      quantity: quantity + 1,
    }));
  };

  decreaseQuantity = () => {
    this.setState(({ quantity }) => ({
      quantity: quantity === 1 ? 1 : quantity - 1,
    }));
  };

  render() {
    const { quantity } = this.state;
    const { price, title, id, remove } = this.props;
    return (
      <div>
        <div>
          <h2 data-testid="shopping-cart-product-name">{ title }</h2>
          <p>{ price }</p>
        </div>
        <div>
          <button
            type="button"
            onClick={ this.decreaseQuantity }
            data-testid="product-decrease-quantity"
          >
            -

          </button>
          <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
          <button
            type="button"
            onClick={ this.increaseQuantity }
            data-testid="product-increase-quantity"
          >
            +

          </button>
          <button
            id={ id }
            type="button"
            onClick={ remove }
            data-testid="remove-product"
          >
            Remover

          </button>
        </div>
      </div>
    );
  }
}

export default CartList;

CartList.propTypes = {
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
};
