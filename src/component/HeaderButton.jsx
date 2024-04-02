import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HeaderButton = () => {
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <Button
      title="Voltar"
      onPress={() => navigation.goBack()}
    />
  );
};

export default HeaderButton;