import { StackNavigationProp } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SplashScreen'>;

const hideSplashScreen = async (navigation: HomeScreenNavigationProp) => {
  await SplashScreen.hideAsync();
  setTimeout(() => {
    navigation.replace('Home');
  }, 3000);
};

export default { hideSplashScreen };