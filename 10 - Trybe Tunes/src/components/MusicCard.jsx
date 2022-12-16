import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      checked: props.defaultChecked,
    };
  }

  onInputChange = async ({ target }) => {
    const { checked } = target;
    const { obj } = this.props;
    if (checked) {
      this.setState({
        loading: true,
        checked: true,
      });
      await addSong(obj);
      this.setState({
        loading: false,
      });
    } else {
      this.setState({
        loading: true,
        checked: false,
      });
      await removeSong(obj);
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { obj } = this.props;
    const { trackName, previewUrl, trackId } = obj;
    const { checked, loading } = this.state;

    if (loading) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

    return (
      <div>
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          Salvar em minhas favoritas
          <input
            type="checkbox"
            name="favoriteInput"
            id={ trackId }
            onChange={ this.onInputChange }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  obj: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  defaultChecked: PropTypes.bool.isRequired,
};

export default MusicCard;
