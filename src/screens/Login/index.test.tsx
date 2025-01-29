import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from './index';
import { useTheme } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useTheme: jest.fn(),
}));

jest.mock('@assets/google.svg', () => 'GoogleLogo');
jest.mock('@assets/book-reading.svg', () => 'BookReadingImage');
jest.mock('@assets/logo.svg', () => 'Logo');

describe('LoginScreen', () => {
  const theme = {
    colors: {
      background: '#fff',
    },
    fontsize: {
      xl: 24,
    },
    fonts: {
      bold: {
        fontWeight: 'bold',
      },
    },
  };

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue(theme);
  });

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<LoginScreen />);
    expect(getByText('Mobile Dictionary')).toBeTruthy();
    expect(getByText('Expanda seu vocabulário e domine o inglês')).toBeTruthy();
    expect(getByTestId('GoogleLogo')).toBeTruthy();
    expect(getByTestId('BookReadingImage')).toBeTruthy();
  });

  it('calls signInWithGoogle when Google login button is pressed', () => {

    const { getByText } = render(<LoginScreen />);
    const googleButton = getByText('Login com Google');
    fireEvent.press(googleButton);
  });
});