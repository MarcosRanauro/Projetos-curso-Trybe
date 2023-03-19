import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    emailInput: '',
    passwordInput: '',
    disabled: true,
  };

  validation = () => {
    const { emailInput, passwordInput } = this.state;
    const minNumbers = 6;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const emailValidation = regex.test(emailInput);
    const passwordValidation = passwordInput.length >= minNumbers;
    if (emailValidation && passwordValidation) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.validation);
  };

  handleClick = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { emailInput } = this.state;
    dispatch(addUser(emailInput));
    history.push('/carteira');
  };

  render() {
    const { emailInput, passwordInput, disabled } = this.state;
    return (
      <form>
        <h1>TrybeWallet</h1>
        <label htmlFor="email-input">
          Email:
          <input
            type="email"
            name="emailInput"
            id="email-input"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ emailInput }
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            type="password"
            name="passwordInput"
            id="password-input"
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ passwordInput }
          />
        </label>
        <button
          type="submit"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar

        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
