import styled, { css } from "styled-components/native";
import { TextInput } from "react-native"
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  active: boolean;
}

export const Container = styled(TextInput)<Props>`
  width: 100%;
  padding: 16px 18px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular };

  color: ${({ theme }) => theme.colors.text_dark };
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;

  margin-bottom: 8px;

  ${({ active }) => active && css`
    border-width: 3px;
    border-color: ${({ theme }) => theme.colors.attention};
  `}
`;