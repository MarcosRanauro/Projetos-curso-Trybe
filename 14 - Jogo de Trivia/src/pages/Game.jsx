import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import QuestionsGame from '../components/QuestionsGame';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <QuestionsGame history={ history } />
        <h1>Game</h1>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Game;
