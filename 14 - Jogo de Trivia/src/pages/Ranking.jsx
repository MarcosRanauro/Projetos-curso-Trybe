import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    return (
      <div
        data-testid="ranking-title"
      >
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            const { history } = this.props;
            history.push('./');
          } }
        >
          Login page
        </button>
        Ranking
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
