import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense, initialEdit } from '../redux/actions';

class Table extends Component {
  removeClick = (id) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(id));
  };

  editClick = (id) => {
    const { dispatch } = this.props;
    dispatch(initialEdit(id));
  };

  render() {
    const { expenses } = this.props;

    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        {expenses && expenses.map((item) => {
          const { id, description, tag, method, value, exchangeRates, currency } = item;
          const { name } = exchangeRates[currency];
          const ask = Number(exchangeRates[currency].ask);
          return (
            <tbody key={ id }>
              <tr>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{name}</td>
                <td>{ask.toFixed(2)}</td>
                <td>{(ask * Number(value)).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.removeClick(item.id) }
                  >
                    Exlcuir
                  </button>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.editClick(item.id) }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Table);
