import React, { Component } from 'react';
import CardsAlbum from '../components/CardsAlbum';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

class Search extends Component {
  state = {
    searchArtist: '',
    disabled: true,
    loading: false,
    resultSearch: '',
    arrayAlbum: [],
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    const two = 2;

    if (value.length >= two) {
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

  onButtonClick = async () => {
    const { searchArtist } = this.state;
    this.setState({
      searchArtist: '',
      loading: true,
    });
    const result = await searchAlbumsAPI(searchArtist);
    if (result.length > 0) {
      this.setState({
        loading: false,
        resultSearch: `Resultado de álbuns de: ${searchArtist}`,
        arrayAlbum: result,
      });
    } else {
      this.setState({
        loading: false,
        resultSearch: 'Nenhum álbum foi encontrado',
        arrayAlbum: [],
      });
    }
  };

  render() {
    const { disabled, searchArtist, loading, resultSearch, arrayAlbum } = this.state;
    if (loading) {
      return (
        <div>
          <Header />
          <Loading />
        </div>
      );
    }

    return (
      <div data-testid="page-search">
        <Header />
        <form className="form-container">
          <input
            className="input-search"
            data-testid="search-artist-input"
            type="text"
            name="searchArtist"
            id="searchArtist"
            placeholder="Nome do artista/banda"
            onChange={ this.onInputChange }
            value={ searchArtist }
          />
          <button
            className="button-search"
            type="button"
            disabled={ disabled }
            data-testid="search-artist-button"
            onClick={ this.onButtonClick }
          >
            Pesquisar
          </button>
        </form>
        <h3>{ resultSearch }</h3>
        {
          arrayAlbum.map((album, index) => <CardsAlbum result={ album } key={ index } />)
        }
      </div>
    );
  }
}

export default Search;
