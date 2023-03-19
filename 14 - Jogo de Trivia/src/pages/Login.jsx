import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';
import createToken from '../services/api';

class Login extends Component {
  state = {
    emailInput: '',
    nameInput: '',
    disabled: true,
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState(
      {
        [name]: value },
      this.validation,
    );
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { emailInput, nameInput } = this.state;
    dispatch(userLogin({ emailInput, nameInput }));
    await createToken();
    history.push('/game');
  };

  validation = () => {
    const { emailInput, nameInput } = this.state;
    const minNumbers = 1;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const emailValidation = regex.test(emailInput);
    const nameValidation = nameInput.length >= minNumbers;
    if (emailValidation && nameValidation) {
      this.setState({ disabled: false });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  render() {
    const { disabled } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              name="nameInput"
              id="nameInput"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="emailInput"
              id="emailInput"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => {
              const { history } = this.props;
              history.push('/settings');
            } }
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nameInput: state.player.nameInput,
  emailInput: state.player.emailInput,
});

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Login);
