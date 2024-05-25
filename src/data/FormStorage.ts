import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_FORMS = 'forms';

interface FormData {
  id: string;
  name: string;
  fields: any[];
}

export class FormStorage {

  async getForms() {
    try {
      const formsData = await AsyncStorage.getItem(KEY_FORMS);
      return formsData ? JSON.parse(formsData) : [];
    } catch (error) {
      console.error('Error al obtener los formularios: ', error);
      return [];
    }
  };

  async addForm(form: FormData) {
    try {
      // Guardar el formulario en el almacenamiento local
      await AsyncStorage.setItem(KEY_FORMS, JSON.stringify([...(await this.getForms()), form]));

      return true;
    } catch (error) {
      console.error('Error al agregar el formulario: ', error);
      return false;
    }
  }

  async removeForm(formId: string) {
    try {
      const forms = await this.getForms();
      const newforms = forms.filter((form: any) => form.id !== formId);
      await AsyncStorage.setItem(KEY_FORMS, JSON.stringify(newforms));
      return newforms;
    } catch (error) {
      console.error('Error al eliminar el formulario:', error);
      return false;
    }
  }

  async updateForm(updatedForm: FormData) {
    try {
      const forms = await this.getForms();
      const updatedForms = forms.map((form: FormData) =>
        form.id === updatedForm.id ? updatedForm : form
      );
      await AsyncStorage.setItem(KEY_FORMS, JSON.stringify(updatedForms));
      return true;
    } catch (error) {
      console.error('Error al actualizar el formulario:', error);
      return false;
    }
  }
}
