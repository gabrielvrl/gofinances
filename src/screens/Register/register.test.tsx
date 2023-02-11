import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { Register } from '.';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

describe('Register Screen', () => {
  jest.mock('@react-navigation/native', () => {
    return {
      useNavigation: jest.fn()
    }
  })

  it('Should open Category Modal when user click on the Category Button', async () => {
    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Providers
      }
    );

    const categoryModal = getByTestId('modal-category');
    const categoryButton = getByTestId('button-category');
    
    fireEvent.press(categoryButton);

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    })
  });
});