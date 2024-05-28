import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../navigation/AppNavigator';
import { RootState } from '../redux/store';
import { selectFormById } from '../redux/selectors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ButtonCustom from '../components/atoms/ButtonCustom';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { FormStorage } from '../data/FormStorage';
import { setForms } from '../redux/formSlice';

type FormScreenRouteProp = RouteProp<RootStackParamList, 'Form'>;

const FormScreen = () => {
  const route = useRoute<FormScreenRouteProp>();
  const { formId } = route.params;
  const form = useSelector((state: RootState) => selectFormById(state, formId!));
  const { top } = useSafeAreaInsets();
  const formStorage = new FormStorage();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadForms = async () => {
      const storedForms = await formStorage.getForms();
      dispatch(setForms(storedForms));
    };

    loadForms();
  }, [dispatch]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={{ paddingTop: top, ...styles.screen }}>
          <View style={{ flexGrow: 1, width: '90%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.container}>
              <Text style={styles.title}>{form?.name}</Text>
              {
                form?.fields.map((item) => (
                  <View key={item.id} style={{ paddingVertical: 5 }}>
                    <Text style={styles.text}>{item.label}</Text>
                    <TextInput style={styles.input} placeholder={item.placeholder} keyboardType={item.type} />
                  </View>
                ))
              }
              <ButtonCustom action={() => Alert.alert('Exito!!!', 'El formulario se ha enviado de manera correcta.', [
                {
                  text: 'Aceptar',
                }
              ])} text='Enviar' containerStyle={{ marginTop: 30 }} />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default FormScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    maxWidth: 1000,
    maxHeight: 800,
    padding: 20,
    width: '90%',
    margin: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 20,
    textAlignVertical: 'center',
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
