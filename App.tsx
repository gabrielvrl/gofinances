import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from "styled-components";
import { StatusBar } from 'expo-status-bar';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { Register } from './src/screens/Register';
import { CategorySelect } from './src/screens/CategorySelect';
import theme from './src/global/styles/theme'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" />
      <Register />
    </ThemeProvider>
  );
}
