import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
// import logo from '../Images/logo.svg';
import './Header.css';

class Header extends Component {
  state = {
    loading: true,
    name: '',
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const user = await getUser();
    this.setState({
      loading: false,
      name: user.name,
    });
  };

  render() {
    const { name, loading } = this.state;
    if (loading) {
      return <Loading />;
    }

    return (
      <header data-testid="header-component" className="container">
        <div className="links-container">
          {/* <img className="logo" src={ logo } alt="Logo TrybeTunes" /> */}
          <h2 data-testid="header-user-name">{ name }</h2>
          <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </div>
      </header>
    );
  }
}

export default Header;
