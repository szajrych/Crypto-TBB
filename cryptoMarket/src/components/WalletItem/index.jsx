import { useState } from "react";
import { Text, View, Image } from "react-native";
import styles from "./styles";

const WalletItem = ({
  marketCryptos,
  symbols,
  total_bought_price,
  quantities,
  total_sold_price,
}) => {
  const { name, current_price, market_cap_rank, image } = marketCryptos;

  const coinValue = current_price * quantities;

  const [ath, setAth] = useState(
    coinValue + total_sold_price - total_bought_price
  );

  const AthContainerColor = ath < 0 ? "#bf0000" : "#198d19";

  const currencyFormatter = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  };

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
              <Text style={styles.CryptoText}>{symbols.toUpperCase()}</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.CryptoPrice}>{currencyFormatter(coinValue)}</Text>
        <View
          style={{
            backgroundColor: AthContainerColor,
            paddingHorizontal: 5,
            paddingVertical: 3,
            borderRadius: 5,
            marginRight: 0,
            alignSelf: "flex-end",
          }}
        >
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontWeight: "bold",
              textAlign: "right",
            }}
          >
            {currencyFormatter(ath.toFixed(2))}
          </Text>
        </View>
        <Text style={styles.CryptoPrice}>{quantities.toFixed(10)}</Text>
      </View>
    </View>
  );
};

export default WalletItem;
