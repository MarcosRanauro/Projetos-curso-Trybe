import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    albumMusics: [],
    favoriteSongs: [],
    loading: false,
  };

  componentDidMount() {
    this.getAlbumMusics();
    this.getSavedFavoriteSongs();
  }

  getAlbumMusics = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const albumMusics = await getMusics(id);
    this.setState({
      albumMusics,
    });
  };

  getSavedFavoriteSongs = async () => {
    this.setState({
      loading: true,
    });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      loading: false,
    });
  };

  render() {
    const { albumMusics, loading, favoriteSongs } = this.state;
    if (loading) {
      return (
        <div>
          <Header />
          <Loading />
        </div>
      );
    }
    return (
      <div data-testid="page-album">
        <Header />
        <h1
          data-testid="artist-name"
        >
          {albumMusics.length > 0 && albumMusics[0].artistName}
        </h1>
        <h2
          data-testid="album-name"
        >
          {albumMusics.length > 0 && albumMusics[0].collectionName}
        </h2>
        {
          albumMusics
            .filter((_track, index) => index !== 0)
            .map((track) => (<MusicCard
              obj={ track }
              defaultChecked={
                !!favoriteSongs.some((song) => song.trackId === track.trackId)
              }
              key={ track.trackName }
            />))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
