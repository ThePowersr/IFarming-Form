import React from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import ButtonCustom from '../atoms/ButtonCustom';

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

const FormField: React.FC<FormFieldProps> = ({ field, onLabelChange, onPlaceholderChange, onTypeChange, onRemove }) => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.fieldContainer} contentContainerStyle={{ flexGrow: 1 }}>
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
        <TextInput
          style={styles.input}
          placeholder="Field Type"
          value={field.type}
          onChangeText={onTypeChange}
        />
        <ButtonCustom text="Eliminar" action={onRemove} containerStyle={{ backgroundColor: 'red' }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 15,
    flex: 1
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default FormField;
