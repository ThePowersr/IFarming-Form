import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root');
  AppRegistry.registerComponent(appName, () => App);
  AppRegistry.runApplication(appName, { initialProps: {}, rootTag });
} else {
  AppRegistry.registerComponent(appName, () => App);
}
