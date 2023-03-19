import React, { Component } from 'react';
import CartList from '../Components/CartList';

class Cart extends Component {
  state = {
    carItems: [],
  };

  componentDidMount() {
    this.pegaItem();
  }

  pegaItem = () => {
    const getCarItens = JSON.parse(localStorage.getItem('CART_ITEMS'));
    this.setState({
      carItems: getCarItens,
    });
  };

  // requisito 10//

  remove = ({ target }) => {
    const items = JSON.parse(localStorage.getItem('CART_ITEMS'));
    const filterItems = items.filter((targetId) => targetId.id !== target.id);
    localStorage.setItem('CART_ITEMS', JSON.stringify(filterItems));
    this.setState({
      carItems: filterItems,
    });
  };

  render() {
    const { carItems } = this.state;
    // console.log(carItems);//
    return (
      (carItems ? (
        carItems.map(({ price, title, id }) => (<CartList
          key={ id }
          id={ id }
          price={ price }
          title={ title }
          remove={ this.remove }
        />)))
        : (
          <div>
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          </div>
        )
      )
    );
  }
}

export default Cart;
