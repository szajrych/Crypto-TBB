import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./styles";
import CryptoItemHistory from "../../components/CryptoItemHistory";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { BACKEND_API_KEY, USER_HISTORY } from "@env";

const HistoryScreen = () => {
  const userId = useSelector((state) => state.userReducer.userId);
  const authToken = useSelector((state) => state.userReducer.authToken);

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token" + " " + authToken,
    },
  };

  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const url = BACKEND_API_KEY + USER_HISTORY + userId;
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error));
    }, [])
  );

  const idx = data.map((item) => item.id);
  const symbols = data.map((item) => item.symbol);
  const exchange_price = data.map((item) => item.exchange_ratio);
  const quantities = data.map((item) => item.quantity);
  const m_invested = data.map((item) => item.invested);
  const trade_type = data.map((item) => item.trade_type);
  const trade_date = data.map((item) => item.trade_date);

  const renderItem = ({ item, index }) => (
    <CryptoItemHistory
      idx={idx[index]}
      symbols={symbols[index]}
      exchange_price={exchange_price[index]}
      quantities={quantities[index]}
      m_invested={m_invested[index]}
      trade_type={trade_type[index]}
      trade_date={trade_date[index]}
    />
  );

  return (
    <View style={{ paddingHorizontal: 0 }}>
      <View style={styles.mainWalletInfo}>
        <Text style={styles.balanceContainerText}>TRADING HISTORY</Text>
      </View>
      <FlatList
        style={{ height: 500, flexGrow: 0 }}
        contentContainerStyle={{
          padding: 0,
          marginBottom: 0,
          marginTop: -5,
        }}
        ListFooterComponent={<View style={{ height: 20 }} />}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HistoryScreen;
