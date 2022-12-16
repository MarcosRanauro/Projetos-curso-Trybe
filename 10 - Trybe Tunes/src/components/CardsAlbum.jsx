import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardsAlbum extends React.Component {
  render() {
    const { result } = this.props;
    const { artistName, collectionName, artworkUrl100, collectionId } = result;
    return (
      <div>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <div>
            <img src={ artworkUrl100 } alt={ collectionName } />
            <h3>{ collectionName }</h3>
            <h6>{ artistName }</h6>
          </div>
        </Link>
      </div>
    );
  }
}

CardsAlbum.propTypes = {
  result: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
  }).isRequired,
};

export default CardsAlbum;
