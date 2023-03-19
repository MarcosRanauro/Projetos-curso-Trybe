import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies, addExpense, editExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valueInput: '',
    descriptionInput: '',
    currencyInput: 'USD',
    methodInput: 'Dinheiro',
    tagInput: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  add = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const {
      valueInput, descriptionInput, currencyInput, methodInput, tagInput } = this.state;
    const obj = {
      value: valueInput,
      description: descriptionInput,
      currency: currencyInput,
      method: methodInput,
      tag: tagInput,
    };
    dispatch(addExpense(obj));
    this.setState({
      valueInput: '',
      descriptionInput: '',
    });
  };

  edit = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const {
      valueInput, descriptionInput, currencyInput, methodInput, tagInput } = this.state;
    const obj = {
      value: valueInput,
      description: descriptionInput,
      currency: currencyInput,
      method: methodInput,
      tag: tagInput,
    };
    dispatch(editExpense(obj));
    this.setState({
      valueInput: '',
      descriptionInput: '',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const {
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
    } = this.state;

    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="text"
            name="valueInput"
            id="value-input"
            data-testid="value-input"
            value={ valueInput }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            name="descriptionInput"
            id="description-input"
            data-testid="description-input"
            value={ descriptionInput }
            onChange={ this.handleChange }
          />
        </label>
        <select
          name="currencyInput"
          id="currency-input"
          data-testid="currency-input"
          value={ currencyInput }
          onChange={ this.handleChange }
        >
          {
            currencies.map((currency) => (
              <option key={ currency }>{ currency }</option>
            ))
          }
        </select>
        <select
          name="methodInput"
          id="method-input"
          data-testid="method-input"
          value={ methodInput }
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tagInput"
          id="tag-input"
          data-testid="tag-input"
          value={ tagInput }
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        {
          editor
            ? <button type="submit" onClick={ this.edit }>Editar despesa</button>
            : <button type="submit" onClick={ this.add }>Adicionar despesa</button>
        }

      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
