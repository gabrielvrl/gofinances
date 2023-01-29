import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export const Profile = () => {
  return (
    <View>
      <Text testID='text-title'>Perfil</Text>

      <TextInput testID='input-name' placeholder="Nome" value='Gabriel' />
      <TextInput testID='input-surname' placeholder="Sobrenome" value='Varela' />

      <Button testID='button-save' title="Salvar" onPress={() => {}} />
    </View>
  );
};