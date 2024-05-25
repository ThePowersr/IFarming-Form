import React from 'react';
import 'react-native-get-random-values';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
//import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import { StatusBar } from 'expo-status-bar';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

// ReactDOM.render(
//   <Router>
//     <Provider store={store}>
//       <AppNavigator />
//     </Provider>
//   </Router>,
//   document.getElementById('root')
// )

export default App;
