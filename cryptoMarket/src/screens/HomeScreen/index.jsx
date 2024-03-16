import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import styles from "./styles";
import CryptoItem from "../../components/CryptoItem";
import LoadingScreen from "../LoadingScreen";
import { CRYPTO_API_KEY } from "@env";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {
  const [coinList, setCoinList] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const fetchData = async () => {
    const resp = await fetch(CRYPTO_API_KEY);
    const data = await resp.json();
    setCoinList(data);
    setLoaded(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  if (loaded || !coinList) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.homeHeader}>Overview</Text>
      <FlatList
        data={coinList}
        renderItem={({ item }) => (
          <>
            <CryptoItem marketCryptos={item} />
          </>
        )}
      />
    </View>
  );
};

export default HomeScreen;
