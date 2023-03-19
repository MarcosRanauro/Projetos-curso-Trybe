import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { nameInput, emailInput, score } = this.props;
    const hash = md5(emailInput).toString();
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt={ nameInput }
          data-testid="header-profile-picture"
        />
        <p>
          Hello,
          <h2 data-testid="header-player-name">{ nameInput }</h2>
        </p>
        <p>
          Current score!
          <h4 data-testid="header-score">{ score }</h4>
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  emailInput: PropTypes.string,
  nameInput: PropTypes.string,
  score: PropTypes.string,
}.isRequired;

const mapStateToProps = (globalState) => ({
  nameInput: globalState.player.nameInput,
  emailInput: globalState.player.emailInput,
  score: globalState.player.score,
});

export default connect(mapStateToProps)(Header);
