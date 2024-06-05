import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import useAnimation from '../hooks/useAnimation';
import SplashScreenHandler from '../utils/SplashScreenHandler';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SplashScreen'>;

export default function AnimatedSplashScreen() {
  const { opacity } = useAnimation();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    SplashScreenHandler.hideSplashScreen(navigation);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { opacity }]}>
        <Image source={require('../../assets/ifarmingLogo.png')} style={styles.image} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38B5B5',
  },
  imageContainer: {
    width: 200,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
