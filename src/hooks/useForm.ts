import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { RootState } from '../redux/store';
import { selectFormById } from '../redux/selectors';
import { setForms } from '../redux/formSlice';
import { FormStorageService } from '../services/FormStorageService';

type FormScreenRouteProp = RouteProp<RootStackParamList, 'Form'>;

export const useForm = () => {
  const route = useRoute<FormScreenRouteProp>();
  const { formId } = route.params;
  const form = useSelector((state: RootState) => selectFormById(state, formId!));
  const dispatch = useDispatch();
  const formStorageService = new FormStorageService();

  useEffect(() => {
    const loadForms = async () => {
      const storedForms = await formStorageService.loadForms();
      dispatch(setForms(storedForms));
    };

    loadForms();
  }, [dispatch]);

  return { form };
};
