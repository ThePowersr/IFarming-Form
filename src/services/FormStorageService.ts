import { FormStorage } from '../data/FormStorage';
import { FormData } from '../data/FormStorage';

export class FormStorageService {
  private formStorage = new FormStorage();

  async loadForms(): Promise<FormData[]> {
    return await this.formStorage.getForms();
  }

  async saveForm(form: FormData): Promise<void> {
    await this.formStorage.addForm(form);
  }
}