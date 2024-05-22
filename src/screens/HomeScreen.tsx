import React from 'react';
import { View, Button, FlatList, Text, TouchableOpacity, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import FormListItem from '../components/molecules/FormListItem';
import { addForm, deleteForm } from '../redux/formSlice'; // Ajusta la importación
import { v4 as uuidv4 } from 'uuid';
import ButtonCustom from '../components/atoms/ButtonCustom';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const forms = useSelector((state: RootState) => state.forms.forms);
  const dispatch = useDispatch();

  const handleCreateForm = () => {
    const newForm = {
      id: uuidv4(),
      name: `Form ${forms.length + 1}`,
      fields: []
    };
    dispatch(addForm({ name: newForm.name })); // Despacha solo el nombre del formulario
  };

  const handleDeleteForm = (id: string) => {
    dispatch(deleteForm(id));
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
      <View style={{ flexGrow: 1, alignItems: 'center' }} >
        <View style={{ flex: 1, justifyContent: 'center', width: '90%' }}>
          {
            forms.length > 0 ?
              <>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 20 }}>Formularios registrados:</Text>
                <FlatList
                  data={forms}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <FormListItem
                      form={item}
                      onPress={() => navigation.navigate('Form', { formId: item.id })}
                      onPressLeft={() => handleDeleteForm(item.id)}
                      onPressRight={() => navigation.navigate('Form', { formId: item.id })}
                    />
                  )}
                />
                {/* <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 20 }}>{forms.length}</Text> */}
                <ButtonCustom text={'Crear un nuevo formulario.'} action={handleCreateForm} />
              </> :
              <>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 20 }}>No tienes ningun formulario registrado</Text>
                <ButtonCustom text={'Registra tu primer formulario'} action={handleCreateForm} />
              </>
          }
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
