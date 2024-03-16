import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_API_KEY } from "@env";

const CryptoClickedItem = ({ item, fetchFavCoins }) => {
  const { name, market_cap_rank, image } = item;
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userReducer.userId);
  const authToken = useSelector((state) => state.userReducer.authToken);

  const addFavCoin = (name) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token" + " " + authToken,
      },
      body: JSON.stringify({ user_id: userId, name: name }),
    };
    BACKEND_API_KEY;
    const url = BACKEND_API_KEY;
    const result = fetch(url, options)
      .then((res) => res.text())
      .then((data) => console.log(data))
      .then(() => fetchFavCoins());
  };

  return (
    <View style={styles.CryptoContainer}>
      <View style={styles.rankNumberBg}>
        <Text style={styles.rankNumber}>{market_cap_rank}</Text>
      </View>
      <Image
        source={{ uri: image }}
        style={{
          height: 25,
          width: 25,
          alignSelf: "center",
        }}
      />
      <Text style={{ color: "white", fontSize: 16, alignSelf: "center" }}>
        {name}
      </Text>
      <TouchableOpacity onPress={() => addFavCoin(name)}>
        <Ionicons name="ios-add-circle" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CryptoClickedItem;
