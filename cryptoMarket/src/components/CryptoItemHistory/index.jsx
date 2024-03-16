import { Text, View } from "react-native";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";

const CryptoItemHistory = ({
  idx,
  symbols,
  exchange_price,
  quantities,
  m_invested,
  trade_type,
  trade_date,
}) => {
  const moneyType = trade_type == "buy" ? "Invested" : "Earned";

  return (
    <View style={styles.CryptoContainer}>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.CryptoName}>{symbols.toUpperCase()}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.CryptoName}>{trade_date.replace("T", " ")}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          alignSelf: "center",
        }}
      >
        <Text style={styles.tradeType}>{trade_type.toUpperCase()}</Text>
        <FontAwesome name="exchange" size={24} color="#198d19" />
      </View>
      <View style={{}}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.TradeInfo}>Ratio </Text>
          <Text style={styles.CryptoPrice}>${exchange_price}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.TradeInfo}>{moneyType} </Text>
          <Text style={styles.CryptoPrice}>${m_invested}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.TradeInfo}>Quantity </Text>
          <Text style={styles.CryptoPrice}>{quantities}</Text>
        </View>
      </View>
    </View>
  );
};

export default CryptoItemHistory;
