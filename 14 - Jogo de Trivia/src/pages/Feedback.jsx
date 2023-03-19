import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  compareAssertions = () => {
    const { assertions } = this.props;
    const three = 3;
    if (assertions >= three) {
      return 'Well Done!';
    }
    return 'Could be better...';
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <div>
          <p data-testid="feedback-text">
            {this.compareAssertions()}
          </p>
          <p>
            Total number of correct questions!
            <p data-testid="feedback-total-question">
              {assertions}
            </p>
          </p>
          <p>
            Total Score!
            <p data-testid="feedback-total-score">{score}</p>
          </p>
        </div>
        <div className="buttons">
          <button
            className="button is-primary"
            type="button"
            data-testid="btn-play-again"
            onClick={ () => {
              const { history } = this.props;
              history.push('/');
            } }
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => {
              const { history } = this.props;
              history.push('/ranking');
            } }
          >
            Ranking
          </button>
        </div>
      </>
    );
  }
}
Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  emailInput: state.player.emailInput,
});

export default connect(mapStateToProps)(Feedback);
