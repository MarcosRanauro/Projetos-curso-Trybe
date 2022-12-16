import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <div>
        <label htmlFor="name">
          Nome
          <input
            data-testid="name-input"
            type="text"
            name="cardName"
            id="name"
            value={ cardName }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="text-area">
          Descrição
          <textarea
            data-testid="description-input"
            name="cardDescription"
            id="text-area"
            cols="50"
            rows="10"
            maxLength="500"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="number1">
          Attr01
          <input
            data-testid="attr1-input"
            type="number"
            name="cardAttr1"
            id="number1"
            value={ cardAttr1 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="number2">
          Attr02
          <input
            data-testid="attr2-input"
            type="number"
            name="cardAttr2"
            id="number2"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="number3">
          Attr03
          <input
            data-testid="attr3-input"
            type="number"
            name="cardAttr3"
            id="number3"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="image">
          Imagem
          <input
            data-testid="image-input"
            type="text"
            name="cardImage"
            id="image"
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="raridade">
          Raridade
          <select
            data-testid="rare-input"
            name="cardRare"
            id="raridade"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>

        { hasTrunfo ? <p>Você já tem um Super Trunfo em seu baralho</p> : (
          <label htmlFor="super-trunfo">
            Super Trybe Trunfo
            <input
              data-testid="trunfo-input"
              type="checkbox"
              name="cardTrunfo"
              id="super-trunfo"
              checked={ cardTrunfo }
              onChange={ onInputChange }
            />
          </label>
        )}

        <button
          type="button"
          data-testid="save-button"
          name="saveCards"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </div>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.number,
  cardAttr2: PropTypes.number,
  cardAttr3: PropTypes.number,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.string,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
}.isRequired;

export default Form;
