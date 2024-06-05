import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addForm, deleteForm, setForms } from '../redux/formSlice';
import { v4 as uuidv4 } from 'uuid';
import { FormStorage } from '../data/FormStorage';

const formStorage = new FormStorage();

export const useForms = () => {
  const dispatch = useDispatch();
  const forms = useSelector((state: RootState) => state.forms.forms);
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
      fields: [],
    };
    await formStorage.addForm(newForm);
    dispatch(addForm({ name: newForm.name, id: newForm.id }));
  };

  const handleDeleteForm = async (id: string) => {
    await formStorage.removeForm(id);
    dispatch(deleteForm(id));
  };

  return {
    forms,
    loading,
    handleCreateForm,
    handleDeleteForm,
  };
};
