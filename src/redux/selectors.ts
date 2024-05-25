import { RootState } from './store';

export const selectFormById = (state: RootState, id: string) => {
  return state.forms.forms.find(form => form.id === id);
};
