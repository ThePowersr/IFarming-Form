import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface FormNameInputProps {
  value: string;
  onChange: (text: string) => void;
}

const FormNameInput: React.FC<FormNameInputProps> = ({ value, onChange }) => {
  return <TextInput style={styles.input} placeholder="Form Name" value={value} onChangeText={onChange} />;
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 20
  },
});

export default FormNameInput;
