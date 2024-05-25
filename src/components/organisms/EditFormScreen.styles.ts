import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerWeb: {
    width: '90%',
    maxWidth: 1000,
    height: 800,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  shadowContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerMobil: {
    width: '90%',
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default styles;
