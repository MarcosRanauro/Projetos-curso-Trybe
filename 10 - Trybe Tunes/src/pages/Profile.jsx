import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends Component {
  state = {
    user: {},
    loading: true,
  };

  componentDidMount() {
    this.profileUser();
  }

  profileUser = async () => {
    const user = await getUser();
    this.setState({
      user,
      loading: false,
    });
  };

  render() {
    const { user, loading } = this.state;
    if (loading) {
      return (
        <div>
          <Header />
          <Loading />
        </div>
      );
    }

    return (
      <div data-testid="page-profile">
        <Header />
        <h4>{ user.name }</h4>
        <h4>{ user.email }</h4>
        <h4>{ user.description }</h4>
        <img src={ user.image } alt={ user.name } data-testid="profile-image" />
        <Link to="/profile/edit">
          Editar perfil
        </Link>
      </div>
    );
  }
}

export default Profile;
