import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { BACKEND_API_KEY } from "@env";

const CryptoItem = ({ marketCryptos, removeCrypto, fetchFavCoins }) => {
  const {
    name,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
    symbol,
    image,
  } = marketCryptos;

  const userId = useSelector((state) => state.userReducer.userId);

  const authToken = useSelector((state) => state.userReducer.authToken);

  const removeFavCoin = (name) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token" + " " + authToken,
      },
    };
    const url = BACKEND_API_KEY + userId + "/delete/" + name + "/";
    const result = fetch(url, options)
      .then((res) => res.text())
      .then((data) => console.log(data))
      .then(() => fetchFavCoins());
  };

  const chartColor = price_change_percentage_24h < 0 ? "#bf0000" : "#198d19";
  const { navigate } = useNavigation();

  return (
    <View style={styles.CryptoContainer}>
      <View style={{ marginRight: "auto", flexDirection: "row" }}>
        <Image
          source={{ uri: image }}
          style={{
            height: 25,
            width: 25,
            marginRight: 5,
            alignSelf: "center",
          }}
        />
        <View style={{ justifyContent: "center" }}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.CryptoName}>{name}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.rankNumberBg}>
                <Text style={styles.rankNumber}>{market_cap_rank}</Text>
              </View>
              <Text style={styles.CryptoText}>{symbol.toUpperCase()}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ justifyContent: "center" }}>
        <Text style={styles.CryptoPrice}>${current_price}</Text>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              backgroundColor: chartColor,
              paddingHorizontal: 3,
              borderRadius: 5,
              marginRight: 0,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              {price_change_percentage_24h.toFixed(2)}%
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigate("ExpandInfo", { marketCryptos })}
          >
            <Feather name="more-vertical" size={24} color="white" />
          </TouchableOpacity>
          {removeCrypto && (
            <TouchableOpacity onPress={() => removeFavCoin(name)}>
              <Ionicons name="remove-circle" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CryptoItem;
