import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import FormField from '../molecules/FormField';
import FormNameInput from '../atoms/FormNameInput';
import ButtonCustom from '../atoms/ButtonCustom';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './EditFormScreen.styles';
import { useFormFields } from '../../utils/formUtils';

const EditFormScreenMobil = () => {
  const { top } = useSafeAreaInsets();
  const {
    name,
    fields,
    setName,
    setFields,
    handleSave,
    addField,
    updateField
  } = useFormFields();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={{ flex: 1, paddingTop: top }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.containerMobil}>
              <FormNameInput value={name} onChange={setName} />
              {fields.map((item) => (
                <FormField
                  key={item.id}
                  field={item}
                  onLabelChange={(text) => updateField(item.id, 'label', text)}
                  onPlaceholderChange={(text) => updateField(item.id, 'placeholder', text)}
                  onTypeChange={(text) => updateField(item.id, 'type', text)}
                  onRemove={() => setFields(fields.filter(field => field.id !== item.id))}
                />
              ))}
              <View style={{ paddingVertical: 10 }}>
                <ButtonCustom text="Agregar campo" action={addField} />
                <ButtonCustom text="Guardar Formulario" action={handleSave} />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditFormScreenMobil;
