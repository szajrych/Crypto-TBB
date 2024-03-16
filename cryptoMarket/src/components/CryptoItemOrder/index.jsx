import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { BACKEND_API_KEY, DELETE_ORDER } from "@env";

const CryptoItemOrder = ({
  coinList,
  removeCrypto,
  symbols,
  exchange_price,
  quantities,
  m_invested,
  idx,
  trade_type,
  fetch_updated_orders,
}) => {
  const userId = useSelector((state) => state.userReducer.userId);
  const authToken = useSelector((state) => state.userReducer.authToken);
  const moneyType = trade_type == "buy" ? "Invested" : "Earned";

  let filtered_data = coinList.filter((item) => {
    return item.symbol === symbols;
  });

  const names = filtered_data.map((item) => item.name);
  const images = filtered_data.map((item) => item.image);

  const removeOrder = (idx) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token" + " " + authToken,
      },
      body: JSON.stringify({ user_id: userId, id: idx }),
    };
    const url = BACKEND_API_KEY + DELETE_ORDER + userId;
    const result = fetch(url, options)
      .then((res) => res.text())
      .then((data) => console.log(data))
      .then(() => fetch_updated_orders());
  };

  return (
    <View style={styles.CryptoContainer}>
      <View style={{ marginRight: "auto", flexDirection: "row" }}>
        <Image
          source={{ uri: "" + images + "" }}
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
              <Text style={styles.CryptoName}>{names}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.CryptoText}>{symbols.toUpperCase()}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ justifyContent: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.TradeInfo}>Rate </Text>
          <Text style={styles.CryptoPrice}>${exchange_price}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.TradeInfo}>{moneyType} </Text>
          <Text style={styles.CryptoPrice}>${m_invested}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.TradeInfo}>Quantity </Text>
          <Text style={styles.CryptoPrice}>{quantities.toFixed(5)}</Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          alignSelf: "center",
          marginLeft: 5,
        }}
      >
        {removeCrypto && (
          <TouchableOpacity onPress={() => removeOrder(idx)}>
            <Ionicons
              name="remove-circle"
              size={24}
              color="white"
              alignSelf="center"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CryptoItemOrder;
