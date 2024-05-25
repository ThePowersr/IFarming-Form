import { Platform } from 'react-native';
import EditFormScreenWeb from '../components/organisms/EditFormScreenWeb';
import EditFormScreenMobil from '../components/organisms/EditFormScreenMobile';


const EditFormScreen = () => {

  return (
    Platform.OS === "web"
      ? <EditFormScreenWeb />
      : <EditFormScreenMobil />
  );
};

export default EditFormScreen;
