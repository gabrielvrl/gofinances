import React from 'react';
import { render } from '@testing-library/react-native';
import { Input } from '.';

describe('Input Component', () => {
  it('Must have specific border color when active', () => {
    const { getByTestId } = render(
      <Input 
        testID='input-email'
        placeholder='E-mail'
        active={true}
      />
    );

    const inputEmail = getByTestId('input-email');
    expect(inputEmail.props.style[0].borderColor).toEqual('#E83F5B');
  });

});