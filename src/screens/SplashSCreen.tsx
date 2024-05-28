import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

SplashScreen.preventAutoHideAsync();

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SplashScreen'>;

export default function AnimatedSplashScreen() {
  const opacity = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };

    animate();
  }, [opacity]);

  const hideSplashScreen = async () => {
    await SplashScreen.hideAsync();
    setTimeout(() => {
      navigation.replace('Home')
    }, 3000)
  };

  useEffect(() => {
    hideSplashScreen();
  }, []);

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
