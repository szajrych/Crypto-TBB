import { Button, Touchable, TouchableOpacity, View, Text } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ onPress, name, text, color = "black" }) => {
  return (
    <TouchableOpacity style={styles.IconButton} onPress={onPress}>
      <Ionicons
        name={name}
        size={22}
        color={color}
        style={{
          flexDirection: "row",
          alignSelf: "center",
          marginRight: 5,
        }}
      />
      <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default IconButton;
