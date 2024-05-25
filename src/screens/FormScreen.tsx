import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View, KeyboardTypeOptions, TextInput } from 'react-native'
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState } from '../redux/store';
import { selectFormById } from '../redux/selectors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FormScreenRouteProp = RouteProp<RootStackParamList, 'Form'>;
type FormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Form'>;

const FormScreen = () => {
  const route = useRoute<FormScreenRouteProp>();
  const { formId } = route.params;
  const navigation = useNavigation<FormScreenNavigationProp>();
  //const dispatch = useDispatch();
  const form = useSelector((state: RootState) => selectFormById(state, formId!));
  const { top } = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ top, ...styles.screen }}>
      <View>
        <Text style={styles.title}>{form?.name}</Text>
        {
          form?.fields.map((item) => (
            <View key={item.id}>
              <Text style={styles.text}>{item.label}</Text>
              <TextInput style={styles.input} placeholder={item.placeholder} keyboardType={item.type} />
            </View>
          ))
        }
      </View>
    </SafeAreaView>
  )
}

export default FormScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20
  },
});
