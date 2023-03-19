import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { userLocalStorage } from '../services/setupLocalStorage';
import logo from '../styles/logoRecipes.png';
import tomate from '../styles/tomate.png';
import '../styles/Login.css';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const passwordRegex = /^[0-9a-zA-Z]{7,}$/;

    if (emailRegex.test(email) && passwordRegex.test(password)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  const handLeChange = (target) => {
    const { name, value } = target;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const handleClick = () => {
    history.push('/meals');
    userLocalStorage(email); // localStorage ok
  };

  return (
    <div className="pageLogin">
      <div className="containerOne">
        <img className="imgLogotipo" src={ logo } alt="logotipo" />
        <img className="imgTomate" src={ tomate } alt="imagem de tomates" />
      </div>
      <div className="containerTwo">
        <h1 className="titleLogin">Login</h1>
        <form>
          <input
            className="inputEmail"
            type="email"
            data-testid="email-input"
            name="email"
            value={ email }
            placeholder="Email"
            onChange={ ({ target }) => handLeChange(target) }
          />
          <input
            className="inputPassword"
            type="password"
            data-testid="password-input"
            value={ password }
            name="password"
            placeholder="Password"
            onChange={ ({ target }) => handLeChange(target) }
          />
          <button
            className="btnLogin"
            type="button"
            data-testid="login-submit-btn"
            onClick={ handleClick }
            disabled={ isDisabled }
          >
            ENTER
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
