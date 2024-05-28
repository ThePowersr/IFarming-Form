import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const NotFoundScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/ifarmingLogo.png')} style={styles.image} />
      <Text style={styles.text}>Página no encontrada</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38B5B5',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default NotFoundScreen;
