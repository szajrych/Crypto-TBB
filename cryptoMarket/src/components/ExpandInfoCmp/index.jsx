import React from "react";
import { View, Image, Alert } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const ExpandInfoTop = (props) => {
  const { image } = props;
  const navigate = useNavigation();

  const informationPopUp = () =>
    Alert.alert(
      "Information",
      "in this window you can analyze the chart of the selected cryptocurrency and simulate its purchase or sale. Remember that in order to be able to trade, you must first select the starting amount in the Profit challenge panel.",
      [
        {
          text: "Ok",
          onPress: () => console.log("accepted info"),
        },
      ]
    );

  return (
    <View style={styles.expandedHeader}>
      <Ionicons
        name="chevron-back-sharp"
        size={26}
        color="white"
        onPress={() => navigate.goBack()}
      />
      <View style={styles.coinDataContainer}>
        <Image source={{ uri: image }} style={{ width: 30, height: 30 }} />
      </View>
      <Entypo
        name="info-with-circle"
        size={20}
        color="white"
        onPress={informationPopUp}
      />
    </View>
  );
};

export default ExpandInfoTop;
