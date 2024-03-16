import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

const ResetButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.IconButton} onPress={onPress}>
      <Text style={{ color: "#fff", fontSize: 20 }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ResetButton;
