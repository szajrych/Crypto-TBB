import React, { useState, useEffect, useRef } from "react";
import { View, Text, Alert, FlatList } from "react-native";
import styles from "./styles";
import IconButton from "../../components/IconButton";
import ResetButton from "../../components/ResetButton";
import WalletModal from "../../components/WalletModal";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import { useFocusEffect } from "@react-navigation/native";
import WalletItem from "../../components/WalletItem";
import LoadingScreen from "../LoadingScreen";
import "intl";
import "intl/locale-data/jsonp/en";
import {
  CRYPTO_API_KEY,
  BACKEND_API_KEY,
  USER_FAV_COINS,
  USER_WALLET_INFO,
  USER_INVESTMENTS,
  USER_RESTART,
} from "@env";

const SimulationScreen = () => {
  const userId = useSelector((state) => state.userReducer.userId);
  const authToken = useSelector((state) => state.userReducer.authToken);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const { navigate } = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const url = BACKEND_API_KEY + USER_FAV_COINS + userId;
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

  const [profitData, setProfitData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const url = BACKEND_API_KEY + USER_WALLET_INFO + userId;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token" + " " + authToken,
        },
      };
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => setProfitData(data))
        .catch((error) => console.log(error));
    }, [])
  );

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
  }, []);

  const initial_amount = profitData.map((item) => item.initial_amount);
  const available_funds = profitData.map((item) => item.available_funds);
  const wallet_change = profitData.map((item) => item.wallet_change.toFixed(2));

  const walletChangeColor = wallet_change < 0 ? "#bf0000" : "#198d19";

  const handler = initial_amount < 1000 ? false : true;

  const filterCrypto = (data) => {
    let output_data = [];
    if (data) {
      for (const symbol of data) {
        const matchedCryptos = coinList.filter((item) => item.symbol == symbol);
        output_data.push(...matchedCryptos);
      }
    }
    return output_data;
  };

  const [selectedFunds, setSelectedFunds] = useState("0");
  const [nonEditable, setNonEditable] = useState(handler);
  const [InitialAmount, setInitialAmount] = useState("0");
  const [AvailableFunds, setAvailableFunds] = useState("0");

  const funds = ["1000", "10000", "50000", "100000"];

  const postChallengeDetails = (DetailsData) => {
    fetch(BACKEND_API_KEY + USER_INVESTMENTS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token" + " " + authToken,
      },
      body: JSON.stringify(DetailsData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .then(() => navigate("RegisterScreen"))
      .catch((error) => {
        console.error(error);
      });
  };

  const resetProfitChallenge = () => {
    fetch(BACKEND_API_KEY + USER_RESTART + userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token" + " " + authToken,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .catch((error) => {
        console.error(error);
      });
  };

  const selection = (selectedFunds, index) => {
    setSelectedFunds(selectedFunds);
    setInitialAmount(selectedFunds);
    setAvailableFunds(selectedFunds);
  };

  const preventInitialRendering = useRef(false);

  useEffect(() => {
    if (preventInitialRendering.current) {
      postChallengeDetails(ChallengeData);
    } else {
      preventInitialRendering.current = true;
    }
  }, [InitialAmount]);

  const ChallengeData = {
    user: userId,
    initial_amount: InitialAmount,
    available_funds: AvailableFunds,
  };

  const selectionReset = () => {
    setSelectedFunds("0");
  };

  const resetOrGoBackButton = () =>
    Alert.alert(
      "Do you want to reset all your progress?",
      "If you confirm it cannot be withdrawn.",
      [
        {
          text: "Go back",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            selectionReset, resetProfitChallenge(), navigate("RegisterScreen");
          },
        },
      ]
    );
  const currencyFormatter = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const symbols = data.map((item) => item.symbol);
  const total_bought_price = data.map((item) => item.total_bought);
  const quantities = data.map((item) => item.quantity);
  const total_sold_price = data.map((item) => item.total_sold);

  const renderItem = ({ item, index }) => (
    <WalletItem
      marketCryptos={item}
      symbols={symbols[index]}
      total_bought_price={total_bought_price[index]}
      quantities={quantities[index]}
      total_sold_price={total_sold_price[index]}
    />
  );

  if (loaded || !data || !profitData || !coinList) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ paddingHorizontal: 0 }}>
      <View style={styles.mainWalletInfo}>
        <Text style={styles.balanceContainerText}>PROFIT CHALLENGE</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.headerInfoText}>Initial amount</Text>
          <Text style={styles.headerInfoPrice}>
            {currencyFormatter(initial_amount)}
          </Text>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.headerInfoText}>Available funds</Text>
          <Text style={styles.headerInfoPrice}>
            {currencyFormatter(available_funds)}
          </Text>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.headerInfoText}>Wallet change</Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              letterSpacing: 1,
              color: walletChangeColor,
            }}
          >
            {wallet_change}%
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View style={styles.balanceContainer}>
            <SelectDropdown
              data={funds}
              onSelect={selection}
              disabled={handler}
              defaultValue={nonEditable ? selectedFunds : ["ADD FUNDS"]}
              buttonStyle={{
                width: 140,
                height: 40,
                backgroundColor: "#0d0d0d",
                borderRadius: 10,
              }}
              dropdownStyle={{ backgroundColor: "#191919", borderRadius: 15 }}
              buttonTextStyle={{ color: "white" }}
              rowTextStyle={{ backgroundColor: "#191919", color: "white" }}
              defaultButtonText={"Add Funds"}
              buttonTextAfterSelection={(selectedFunds, index) => {
                return "Add Funds";
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
            {selectedFunds && (
              <ResetButton text="Reset" onPress={resetOrGoBackButton} />
            )}
          </View>
        </View>
      </View>
      <View style={styles.walletButtons}>
        <IconButton
          name="star"
          color="gold"
          text="Favourite"
          onPress={() => navigate("WalletScreen")}
        />
        <IconButton name="ios-wallet-sharp" color="#654231" text="Market" />
      </View>
      <FlatList
        style={{ height: 500, flexGrow: 0 }}
        contentContainerStyle={{
          padding: 0,
          marginBottom: 0,
          marginTop: -5,
        }}
        ListFooterComponent={<View style={{ height: 20 }} />}
        data={filterCrypto(symbols)}
        renderItem={renderItem}
      />
      <WalletModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default SimulationScreen;
