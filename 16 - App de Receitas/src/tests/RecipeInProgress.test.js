import React from 'react';
import { screen } from '@testing-library/react';
import RecipeInProgress from '../pages/RecipeInProgress';
import renderWithRouter from './services/renderWithRouter';

describe('RecipeInProgress', () => {
  it('should render the share button', () => {
    renderWithRouter(<RecipeInProgress />);

    const shareButton = screen.getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
  });
});

describe('RecipeInProgress', () => {
  it('should render the favorite button', () => {
    renderWithRouter(<RecipeInProgress />);
    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
  });
});

describe('RecipeInProgress', () => {
  it('should render the category field', () => {
    renderWithRouter(<RecipeInProgress />);
    const categoryField = screen.getByTestId('recipe-category');
    expect(categoryField).toBeInTheDocument();
  });
});
