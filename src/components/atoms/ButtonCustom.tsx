import { Pressable, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

interface Props {
  text: string;
  action: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}


const ButtonCustom = ({ text, action, containerStyle, textStyle }: Props) => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: '#38b5b5', alignItems: 'center', borderRadius: 20, padding: 20, elevation: 1, marginVertical: 10, ...containerStyle }}
      onPress={action}
    >
      <Text style={{ color: 'white', fontSize: 20, ...textStyle }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;

