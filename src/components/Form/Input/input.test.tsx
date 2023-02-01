import React from 'react';
import { render } from '@testing-library/react-native';

import { ThemeProvider } from 'styled-components/native';
import theme from '../../../global/styles/theme';

import { Input } from '.';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

describe('Input Component', () => {
  it('Must have specific border color when active', () => {
    const { getByTestId } = render(
      <Input 
        testID='input-email'
        placeholder='E-mail'
        keyboardType='email-address'
        autoCorrect={false}
        active={true}
      />,
      {
        wrapper: Providers
      }
    );

    const inputEmail = getByTestId('input-email');
    expect(inputEmail.props.style[0].borderColor).toBe(theme.colors.attention);
    expect(inputEmail.props.style[0].borderWidth).toEqual(3);
  });
});