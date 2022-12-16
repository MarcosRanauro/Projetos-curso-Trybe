import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import logo from '../Images/logo.svg';
import './Login.css';

class Login extends Component {
  state = {
    loginName: '',
    disabled: true,
    loading: false,
    redirect: false,
  };

  inputName = ({ target }) => {
    const { value, name } = target;
    const minLenght = 3;

    if (value.length >= minLenght) {
      this.setState({
        [name]: value,
        disabled: false,
      });
    } else {
      this.setState({
        [name]: value,
        disabled: true,
      });
    }
  };

  validateButton = async () => {
    const { loginName } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: loginName });
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { disabled, loading, redirect, loginName } = this.state;
    if (loading) {
      return (
        <div>
          <Loading />
          {redirect && <Redirect to="/search" />}
        </div>
      );
    }
    return (
      <div data-testid="page-login" id="container">
        <fieldset className="login-container">
          <label htmlFor="loginName">
            <img className="logo" src={ logo } alt="Logo TrybeTunes" />
            <input
              className="login-input"
              type="text"
              name="loginName"
              id="loginName"
              data-testid="login-name-input"
              placeholder="Digite seu nome"
              onChange={ this.inputName }
              value={ loginName }
            />
          </label>
          <button
            className="button-input"
            disabled={ disabled }
            type="button"
            data-testid="login-submit-button"
            onClick={ this.validateButton }
          >
            Entrar
          </button>
        </fieldset>
      </div>
    );
  }
}

export default Login;
