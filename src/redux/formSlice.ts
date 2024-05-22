import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface Field {
  id: string;
  label: string;
  placeholder: string;
  type: string;
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
    addForm: (state, action: PayloadAction<{ name: string }>) => {
      const newForm: Form = {
        id: uuidv4(),
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
        // if (existingFormIndex !== -1) {
        //   };
      }
    },
    deleteForm: (state, action: PayloadAction<string>) => {
      state.forms = state.forms.filter(form => form.id !== action.payload);
    },
  },
});

export const { addForm, updateForm, deleteForm } = formSlice.actions;
export default formSlice.reducer;
