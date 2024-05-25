import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import EditFormScreen from '../screens/EditFormScreen';
import FormScreen from '../screens/FormScreen';
import { Platform, Text, View } from 'react-native';
//import NotFoundScreen from '../screens/NotFoundScreen';

export type RootStackParamList = {
  Home: undefined;
  EditForm: { formId?: string };
  Form: { formId?: string };
  NotFound: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Configuración de los enlaces con la propiedad prefixes
const linking = {
  prefixes: ['http://localhost:3000', 'https://myapp.com'],
  config: {
    screens: {
      Home: '',
      EditForm: 'edit-form/:formId?',
      Form: 'form/:formId?',
      NotFound: '*',
    },
  },
};

const NotFoundComponent = () => (
  <View>
    <Text>Not Found</Text>
  </View>
);

const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, cardStyle: { backgroundColor: Platform.OS === 'web' ? '#e4dddd' : 'white' } }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EditForm" component={EditFormScreen} />
        <Stack.Screen name="Form" component={FormScreen} />
        <Stack.Screen name="NotFound" component={NotFoundComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
