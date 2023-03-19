import { Component } from 'react';
import PropTypes from 'prop-types';

class BttnCartInfoPage extends Component {
  addToCart = (price, title, id) => {
    let item = JSON.parse(localStorage.getItem('CART_ITEMS'));
    if (!item) {
      item = [];
    }
    const clickedItem = { price, title, id };
    item.push(clickedItem);
    localStorage.setItem('CART_ITEMS', JSON.stringify(item));
  };

  render() {
    const { price, title, id } = this.props;
    return (
      <div>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addToCart(price, title, id) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

export default BttnCartInfoPage;

BttnCartInfoPage.propTypes = {
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
