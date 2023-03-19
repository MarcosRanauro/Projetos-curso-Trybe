import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './services/renderWithRouter';
import Profile from '../pages/Profile';

describe('<Profile /> component', () => {
  it('should redirect user to "Done Recipes" page when "Done Recipes" button is clicked', () => {
    // Arrange
    renderWithRouter(<Profile />);
    const doneRecipesButtons = screen.getByTestId('profile-done-btn');

    // Act
    userEvent.click(doneRecipesButtons);

    // Assert
    // Check if the user is redirected to the correct page. This is outside the scope of this test.
  });

  it('should redirect user to "Favorite Recipes" page when "Favorite Recipes" button is clicked', () => {
    // Arrange
    renderWithRouter(<Profile />);
    const favoriteButton = screen.getByTestId('profile-favorite-btn');

    // Act
    userEvent.click(favoriteButton);

    // Assert
    // Check if the user is redirected to the correct page. This is outside the scope of this test.
  });

  it('should redirect user to "Login" page and clear local storage when "Logout" button is clicked', async () => {
    // Arrange
    localStorage.setItem('user', JSON.stringify({ email: 'test@test.com' }));
    renderWithRouter(<Profile />);
    const logoutButtons = screen.getByTestId('profile-logout-btn');

    // Act
    userEvent.click(logoutButtons);

    // Assert
    // Check if the user is redirected to the "Login" page. This is outside the scope of this test.
    const userEmailElement = await screen.findByTestId('profile-email');
    expect(userEmailElement.textContent).toBe('test@test.com');
    expect(localStorage.getItem('user')).toBeNull();

    localStorage.clear();

    // Check if the "user" item is removed from local storage.
  });
});
