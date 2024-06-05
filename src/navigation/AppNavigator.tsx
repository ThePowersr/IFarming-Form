import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import EditFormScreen from '../screens/EditFormScreen';
import FormScreen from '../screens/FormScreen';
import { Platform } from 'react-native';
import AnimatedSplashScreen from '../screens/SplashSCreen';
import NotFoundScreen from '../screens/NotFoundScreen';

export type RootStackParamList = {
  Home: undefined;
  EditForm: { formId?: string };
  Form: { formId?: string };
  NotFound: undefined;
  SplashScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['http://localhost:3000'],
  config: {
    screens: {
      Home: '',
      EditForm: 'edit-form/:formId?',
      Form: 'form/:formId?',
      NotFound: '*',
    },
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false, cardStyle: { backgroundColor: Platform.OS === 'web' ? '#e4dddd' : 'white' } }}>
        <Stack.Screen name='SplashScreen' component={AnimatedSplashScreen}></Stack.Screen>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EditForm" component={EditFormScreen} />
        <Stack.Screen name="Form" component={FormScreen} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
