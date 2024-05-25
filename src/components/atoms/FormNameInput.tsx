import React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';

interface FormNameInputProps {
  value: string;
  onChange: (text: string) => void;
}

const FormNameInput: React.FC<FormNameInputProps> = ({ value, onChange }) => {
  return (
    <View>
      <Text style={styles.text}>Nombre de formulario:</Text>
      <TextInput style={styles.input} placeholder="Form Name" value={value} onChangeText={onChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 20,
  }
});

export default FormNameInput;
