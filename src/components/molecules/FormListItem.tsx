import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ButtonCustom from '../atoms/ButtonCustom';
import { Swipeable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

interface FormListItemProps {
  form: { id: string, name: string };
  onPress: () => void;
  onPressRight: () => void;
  onPressLeft: () => void;
}

interface ItemActionBoxProps {
  onPress: () => void;
}

const ItemDeleteBox: React.FC<ItemActionBoxProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ backgroundColor: 'red', ...styles.contarinerBox }}>
        <Animated.Text style={styles.delete}>Eliminar</Animated.Text>
      </View>
    </TouchableOpacity>
  )
}

const ItemUpdateBox: React.FC<ItemActionBoxProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ backgroundColor: '#38b5b5', ...styles.contarinerBox }}>
        <Animated.Text style={styles.update}>Editar</Animated.Text>
      </View>
    </TouchableOpacity>
  )
}

const FormListItem: React.FC<FormListItemProps> = ({ form, onPress, onPressLeft, onPressRight }) => {
  return (
    <Swipeable
      renderLeftActions={() => <ItemDeleteBox onPress={onPressLeft} />}
      renderRightActions={() => <ItemUpdateBox onPress={onPressRight} />}
    >
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>{form.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <ButtonCustom text="Ver" action={onPress} containerStyle={{ padding: 10, paddingHorizontal: 20, marginRight: 10 }} />
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  contarinerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flex: 1
  },
  delete: {
    color: 'white',
    fontSize: 16,
  },
  update: {
    color: 'white',
    fontSize: 16
  }
});

export default FormListItem;
