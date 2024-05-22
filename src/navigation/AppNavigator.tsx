import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import FormScreen from '../screens/FormScreen';

export type RootStackParamList = {
  Home: undefined;
  Form: { formId?: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'white' } }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Form" component={FormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
