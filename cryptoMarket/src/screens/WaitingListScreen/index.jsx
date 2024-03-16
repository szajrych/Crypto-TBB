import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./styles";
import IconButton from "../../components/IconButton";
import CryptoItemOrder from "../../components/CryptoItemOrder";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { BACKEND_API_KEY, CRYPTO_API_KEY, USER_LISTED_ORDERS } from "@env";

const WaitingListScreen = () => {
  const [coinList, setCoinList] = useState([]);
  const fetchCoinData = async () => {
    const resp = await fetch(CRYPTO_API_KEY);
    const data = await resp.json();
    setCoinList(data);
  };
  useEffect(() => {
    fetchCoinData();
  }, []);

  const userId = useSelector((state) => state.userReducer.userId);
  const authToken = useSelector((state) => state.userReducer.authToken);
  const [removeCrypto, setRemoveCrypto] = useState(false);

  const url = BACKEND_API_KEY + USER_LISTED_ORDERS + userId;
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token" + " " + authToken,
        },
      };
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error));
    }, [])
  );

  const fetch_updated_orders = () => {
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Token" + " " + authToken,
      },
    };
    const result = fetch(url, option)
      .then((res) => res.json())
      .then((data) => setData(data));
    console.log(JSON.stringify(result));
  };

  const idx = data.map((item) => item.id);
  const symbols = data.map((item) => item.symbol);
  const exchange_price = data.map((item) => item.exchange_ratio);
  const quantities = data.map((item) => item.quantity);
  const m_invested = data.map((item) => item.invested);
  const trade_type = data.map((item) => item.trade_type);

  const renderItem = ({ item, index }) => (
    <CryptoItemOrder
      coinList={coinList}
      removeCrypto={removeCrypto}
      symbols={symbols[index]}
      exchange_price={exchange_price[index]}
      quantities={quantities[index]}
      m_invested={m_invested[index]}
      idx={idx[index]}
      trade_type={trade_type[index]}
      fetch_updated_orders={fetch_updated_orders}
    />
  );

  return (
    <View style={{ paddingHorizontal: 0 }}>
      <View style={styles.mainWalletInfo}>
        <Text style={styles.balanceContainerText}>ORDERS</Text>
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: -15,
        }}
      >
        <IconButton
          name="remove-circle"
          text="CANCEL"
          color="black"
          onPress={() => {
            setRemoveCrypto(!removeCrypto);
          }}
        />
      </View>
    </View>
  );
};

export default WaitingListScreen;
