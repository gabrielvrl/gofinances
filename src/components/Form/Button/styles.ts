import styled from "styled-components/native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { PropsWithChildren } from 'react';
import { RFValue } from "react-native-responsive-fontsize";

interface ButtonProps extends PropsWithChildren<RectButtonProps> {
  onPress: () => void;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary };
  
  border-radius: 5px;
  padding: 18px;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium };
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.shape};

`;