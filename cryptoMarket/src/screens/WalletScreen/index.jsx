import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./styles";
import IconButton from "../../components/IconButton";
import WalletModal from "../../components/WalletModal";
import CryptoItem from "../../components/CryptoItem";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "../LoadingScreen";
import { CRYPTO_API_KEY, BACKEND_API_KEY } from "@env";

const WalletScreen = () => {
  const userId = useSelector((state) => state.userReducer.userId);
  const authToken = useSelector((state) => state.userReducer.authToken);
  const [modalVisible, setModalVisible] = useState(false);
  const [removeCrypto, setRemoveCrypto] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const { navigate } = useNavigation();

  const [coinList, setCoinList] = useState([]);

  const fetchData = async () => {
    setLoaded(true);
    const resp = await fetch(CRYPTO_API_KEY);
    const data = await resp.json();
    setCoinList(data);
    setLoaded(false);
  };

  useEffect(() => {
    fetchData();
    fetchFavCoins();
  }, []);

  const coinNames = coinList.map((item) => item.name);

  const filteredCrypto = (data) => {
    let output_data = [];
    if (data) {
      data.forEach((item) => {
        if (Object.values(coinNames).includes(item)) {
          let new_item = item;
          output_data.push(coinList.filter((item) => item.name == new_item)[0]);
        }
        return [...new Set(output_data)];
      });
    }
    return [...new Set(output_data)];
  };

  const [favList, setFavList] = useState([]);
  const fetchFavCoins = () => {
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Token" + " " + authToken,
      },
    };
    const url = BACKEND_API_KEY + userId + "/";
    const result = fetch(url, option)
      .then((res) => res.json())
      .then((data) => setFavList(data.coins));
    console.log(JSON.stringify(result));
  };

  const renderItem = ({ item }) => (
    <CryptoItem
      marketCryptos={item}
      removeCrypto={removeCrypto}
      fetchFavCoins={fetchFavCoins}
    />
  );

  if (loaded || !coinList || !favList) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ paddingHorizontal: 0 }}>
      <View style={styles.mainWalletInfo}>
        <Text style={styles.balanceContainerText}>FAVOURITE COINS</Text>
      </View>
      <View style={styles.walletButtons}>
        <IconButton name="star" color="gold" text="Favourite" />
        <IconButton
          name="ios-wallet-sharp"
          color="#654231"
          text="Market"
          onPress={() => navigate("SimulationScreen")}
        />
      </View>
      <FlatList
        style={{ height: 350, flexGrow: 0 }}
        contentContainerStyle={{
          padding: 20,
          marginBottom: 100,
          marginTop: -15,
        }}
        ListFooterComponent={<View style={{ height: 20 }} />}
        data={filteredCrypto(favList)}
        renderItem={renderItem}
      />
      <WalletModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        fetchFavCoins={fetchFavCoins}
        setFavList={setFavList}
        coinList={coinList}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 0,
        }}
      >
        <IconButton
          name="ios-add-circle"
          text="ADD"
          color="black"
          onPress={() => setModalVisible(true)}
        />
        <IconButton
          name="remove-circle"
          text="REMOVE"
          color="black"
          onPress={() => setRemoveCrypto(!removeCrypto)}
        />
      </View>
    </View>
  );
};

export default WalletScreen;
