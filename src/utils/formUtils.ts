import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addForm, updateForm } from '../redux/formSlice';
import { v4 as uuidv4 } from 'uuid';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FormStorage } from '../data/FormStorage';
import { KeyboardTypeOptions } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

interface FieldProps {
  id: string;
  label: string;
  placeholder: string;
  type: KeyboardTypeOptions;
}

type EditFormScreenRouteProp = RouteProp<RootStackParamList, 'EditForm'>;
type EditFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditForm'>;

export const useFormFields = () => {
  const route = useRoute<EditFormScreenRouteProp>();
  const navigation = useNavigation<EditFormScreenNavigationProp>();
  const dispatch = useDispatch();
  const forms = useSelector((state: RootState) => state.forms.forms);
  const [name, setName] = useState('');
  const [fields, setFields] = useState<FieldProps[]>([]);
  const formStorage = new FormStorage();

  useEffect(() => {
    if (route.params?.formId) {
      const loadForm = async () => {
        const storedForms = await formStorage.getForms();
        const form = storedForms.find((f: any) => f.id === route.params.formId);
        if (form) {
          setName(form.name);
          setFields(form.fields);
        }
      };
      loadForm();
      console.log(forms.map(item => item.fields));
    }
  }, [forms, route.params?.formId]);

  const handleSave = async () => {
    const formId = route.params?.formId || uuidv4();
    const form = { id: formId, name, fields };
    if (route.params?.formId) {
      const success = await formStorage.updateForm(form);
      if (success) {
        dispatch(updateForm(form));
      }
    } else {
      const success = await formStorage.addForm(form);
      if (success) {
        dispatch(addForm(form));
      }
    }
    navigation.navigate('Home');
  };

  const addField = () => {
    setFields([...fields, { id: uuidv4(), label: '', placeholder: '', type: 'default' }]);
  };

  const updateField = (id: string, key: keyof FieldProps, value: string) => {
    setFields(fields.map(field => field.id === id ? { ...field, [key]: value } : field));
  };

  return { name, fields, setName, setFields, handleSave, addField, updateField };
};
