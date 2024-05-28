import { AppRegistry, Platform } from 'react-native';
import App from './App';
import appJson from './app.json';

const appName = appJson.expo.name;

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root');
  AppRegistry.registerComponent(appName, () => App);
  AppRegistry.runApplication(appName, { initialProps: {}, rootTag });
} else {
  AppRegistry.registerComponent(appName, () => App);
}

