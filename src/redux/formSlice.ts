import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KeyboardTypeOptions } from 'react-native';

interface Field {
  id: string;
  label: string;
  placeholder: string;
  type: KeyboardTypeOptions;
}

export interface Form {
  id: string;
  name: string;
  fields: Field[];
}

interface FormState {
  forms: Form[];
}

const initialState: FormState = {
  forms: [],
};

const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<{ name: string, id: string }>) => {
      const newForm: Form = {
        id: action.payload.id,
        name: action.payload.name,
        fields: [],
      };
      state.forms.push(newForm);
    },
    updateForm: (state, action: PayloadAction<Form>) => {
      const { id, name, fields } = action.payload;
      const existingFormIndex = state.forms.findIndex(form => form.id === id);
      state.forms[existingFormIndex] = {
        ...state.forms[existingFormIndex],
        name, // Actualiza el nombre del formulario
        fields, // Actualiza los campos del formulario
      }
    },
    deleteForm: (state, action: PayloadAction<string>) => {
      state.forms = state.forms.filter(form => form.id !== action.payload);
    },
    setForms: (state, action: PayloadAction<Form[]>) => {
      state.forms = action.payload;
    }

  },

});

export const { addForm, updateForm, deleteForm, setForms } = formSlice.actions;
export default formSlice.reducer;