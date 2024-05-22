import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addForm, updateForm } from '../redux/formSlice';
import { v4 as uuidv4 } from 'uuid';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import FormField from '../components/molecules/FormField';
import FormNameInput from '../components/atoms/FormNameInput';
import ButtonCustom from '../components/atoms/ButtonCustom';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FormScreenRouteProp = RouteProp<RootStackParamList, 'Form'>;
type FormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Form'>;

interface FieldProps {
  id: string;
  label: string;
  placeholder: string;
  type: string;
}

const FormScreen = () => {
  const route = useRoute<FormScreenRouteProp>();
  const navigation = useNavigation<FormScreenNavigationProp>();
  const dispatch = useDispatch();
  const forms = useSelector((state: RootState) => state.forms.forms);
  const [name, setName] = useState('');
  const [fields, setFields] = useState<FieldProps[]>([]);
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    if (route.params?.formId) {
      const form = forms.find(f => f.id === route.params.formId);
      if (form) {
        setName(form.name);
        setFields(form.fields);
      }
    }
    console.log(forms);
  }, [route.params?.formId]);

  const handleSave = () => {
    const formId = route.params?.formId || uuidv4();
    const form = { id: formId, name, fields };
    if (route.params?.formId) {
      dispatch(updateForm(form));
    } else {
      dispatch(addForm(form));
    }
    navigation.goBack();
  };


  const addField = () => {
    setFields([...fields, { id: uuidv4(), label: '', placeholder: '', type: 'text' }]);
  };

  const updateField = (id: string, key: keyof FieldProps, value: string) => {
    setFields(fields.map(field => field.id === id ? { ...field, [key]: value } : field));
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: '5%', paddingTop: top }}>
      <View style={{ flex: 1 }}>
        <FormNameInput value={name} onChange={setName} />
        <FlatList
          scrollEnabled={true}
          data={fields}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FormField
              field={item}
              onLabelChange={(text) => updateField(item.id, 'label', text)}
              onPlaceholderChange={(text) => updateField(item.id, 'placeholder', text)}
              onTypeChange={(text) => updateField(item.id, 'type', text)}
              onRemove={() => setFields(fields.filter(field => field.id !== item.id))}
            />
          )}
        />
        <ButtonCustom text="Add Field" action={addField} />
        <ButtonCustom text="Save Form" action={handleSave} />
      </View>
    </SafeAreaView>
  );
};

export default FormScreen;
