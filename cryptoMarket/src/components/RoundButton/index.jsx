import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

const RoundButton = ({ name, onPress }) => {
  return (
    <TouchableOpacity style={styles.RoundedButton} onPress={onPress}>
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default RoundButton;
