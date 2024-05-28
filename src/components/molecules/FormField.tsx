import React from 'react';
import { View, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import ButtonCustom from '../atoms/ButtonCustom';
import { SelectList } from 'react-native-dropdown-select-list';

interface FieldProps {
  id: string;
  label: string;
  placeholder: string;
  type: string;
}

interface FormFieldProps {
  field: FieldProps;
  onLabelChange: (text: string) => void;
  onPlaceholderChange: (text: string) => void;
  onTypeChange: (text: string) => void;
  onRemove: () => void;
}

const keyboardTypeOptions: { key: string, value: KeyboardTypeOptions }[] = [
  { key: '1', value: 'default' },
  { key: '2', value: 'number-pad' },
  { key: '3', value: 'decimal-pad' },
  { key: '4', value: 'numeric' },
  { key: '5', value: 'email-address' },
  { key: '6', value: 'phone-pad' },
  { key: '7', value: 'url' },
  { key: '8', value: 'ascii-capable' },
  { key: '9', value: 'numbers-and-punctuation' },
  { key: '10', value: 'name-phone-pad' },
  { key: '11', value: 'twitter' },
  { key: '12', value: 'web-search' },
  { key: '13', value: 'visible-password' },
];

const FormField: React.FC<FormFieldProps> = ({ field, onLabelChange, onPlaceholderChange, onTypeChange, onRemove }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.input}
          placeholder="Field Label"
          value={field.label}
          onChangeText={onLabelChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Field Placeholder"
          value={field.placeholder}
          onChangeText={onPlaceholderChange}
        />
        <SelectList
          data={keyboardTypeOptions}
          save='value'
          setSelected={onTypeChange}
          placeholder='Tipo de Input'
        />
        <ButtonCustom text="Eliminar" action={onRemove} containerStyle={{ backgroundColor: 'red' }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    flex: 1
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 20
  },
});

export default FormField;
