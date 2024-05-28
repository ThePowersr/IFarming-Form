import { useEffect, useState } from 'react';
import { View, FlatList, Text, SafeAreaView, ScrollView, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import FormListItem from '../components/molecules/FormListItem';
import { addForm, deleteForm, setForms } from '../redux/formSlice';
import { v4 as uuidv4 } from 'uuid';
import ButtonCustom from '../components/atoms/ButtonCustom';
import { FormStorage } from '../data/FormStorage';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const formStorage = new FormStorage();
  const forms = useSelector((state: RootState) => state.forms.forms);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadForms = async () => {
      const storedForms = await formStorage.getForms();
      dispatch(setForms(storedForms));
      setLoading(false);
    };

    loadForms();
  }, [dispatch]);

  const handleCreateForm = async () => {
    const newForm = {
      id: uuidv4(),
      name: `Form ${forms.length + 1}`,
      fields: []
    };
    await formStorage.addForm(newForm)
    dispatch(addForm({ name: newForm.name, id: newForm.id })); // Despacha solo el nombre del formulario
  };

  const handleDeleteForm = async (id: string) => {
    await formStorage.removeForm(id)
      .then((items) => {
        console.log('hecho');
        console.log(items)
      })
      .catch((error) => console.log(error));
    console.log(id);
    dispatch(deleteForm(id));
  };

  if (loading) {
    return <ActivityIndicator />;

  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
      <View style={{ flexGrow: 1, alignItems: 'center' }} >
        <View style={{ flex: 1, justifyContent: 'center', width: '90%', alignItems: 'center' }}>
          {
            forms.length > 0 ?
              <View style={Platform.OS === 'web' ? { ...styles.containerWeb, ...styles.shadowContainer } : styles.containerMobil}>
                <Text style={styles.title}>Formularios registrados:</Text>
                <FlatList
                  data={forms}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <FormListItem
                      form={item}
                      onPress={() => navigation.navigate('Form', { formId: item.id })}
                      onPressLeft={() => handleDeleteForm(item.id)}
                      onPressRight={() => navigation.navigate('EditForm', { formId: item.id })}
                    />
                  )}
                />
                <ButtonCustom text={'Crear un nuevo formulario.'} action={handleCreateForm} />
              </View> :
              <View style={Platform.OS === 'web' ? { ...styles.withoutFormsWeb, ...styles.shadowContainer } : styles.withoutFormsMobil}>
                <Text style={styles.title}>No tienes ningun formulario registrado</Text>
                <ButtonCustom text={'Registra tu primer formulario'} action={handleCreateForm} />
              </View>
          }
        </View>
      </View>
    </SafeAreaView>
  )
};

export default HomeScreen;

const styles = StyleSheet.create({
  containerWeb: {
    maxWidth: 1000,
    height: 800,
    padding: 20,
    width: '90%',
    margin: 0,
    backgroundColor: 'white'
  },
  containerMobil: {
    flex: 1,
    width: '90%',
    margin: 0
  },
  withoutFormsWeb: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'white'
  },
  withoutFormsMobil: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 20
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
  }
});
