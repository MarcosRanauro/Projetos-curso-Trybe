import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      saveCards: [],
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      this.clickButton();
    });
  };

  clickButton = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,

    } = this.state;

    const maxPopint = 90;
    const sumAttr = 210;

    const validateName = cardName.length > 0;
    const validateDescription = cardDescription.length > 0;
    const validateImage = cardImage.length > 0;
    const validadeCardRare = cardRare.length > 0;
    const validateAttr1 = parseInt(cardAttr1, 10) <= maxPopint
    && parseInt(cardAttr1, 10) >= 0;
    const validateAtrr2 = parseInt(cardAttr2, 10) <= maxPopint
    && parseInt(cardAttr2, 10) >= 0;
    const validateAtrr3 = parseInt(cardAttr3, 10) <= maxPopint
    && parseInt(cardAttr3, 10) >= 0;
    const sumAtrr = parseInt(cardAttr1, 10)
    + parseInt(cardAttr2, 10)
    + parseInt(cardAttr3, 10) <= sumAttr;

    this.setState({
      isSaveButtonDisabled:
      !(
        validateName
     && validateDescription
     && validateImage
     && validadeCardRare
     && validateAttr1
     && validateAtrr2
     && validateAtrr3
     && sumAtrr
      ),
    });
  };

  saveCards = (event) => {
    event.preventDefault();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    const save = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    this.setState(({ saveCards }) => ({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'Normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      saveCards: [...saveCards, save],
    }));
    if (cardTrunfo) {
      this.setState(() => ({
        hasTrunfo: true,
      }));
    }
  };

  deleteCard = (card) => {
    const { saveCards } = this.state;
    const newCards = saveCards.filter((c) => c !== card);

    this.setState({
      saveCards: newCards,
      hasTrunfo: false,
    });
  };

  renderCard = () => {
    const { saveCards } = this.state;
    return saveCards.map((
      {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
      },
      index,
    ) => (
      <Card
        key={ index }
        cardName={ cardName }
        cardDescription={ cardDescription }
        cardAttr1={ cardAttr1 }
        cardAttr2={ cardAttr2 }
        cardAttr3={ cardAttr3 }
        cardImage={ cardImage }
        cardRare={ cardRare }
        cardTrunfo={ cardTrunfo }
      />));
  };

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
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.saveCards }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />

        <input
          onClick={ () => this.deleteCard(card) }
          type="button"
          value="Excluir"
          data-testid="delete-button"
        />

        {this.renderCard()}

      </div>
    );
  }
}
export default App;
