import React from 'react';
import 'react-native-get-random-values';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
// import { StatusBar } from 'expo-status-bar';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      {/* <StatusBar /> */}
      <AppNavigator />
    </Provider>
  );
};

export default App;
