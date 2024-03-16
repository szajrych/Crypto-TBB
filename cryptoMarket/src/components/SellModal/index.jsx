import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  BACKEND_API_KEY,
  CRYPTO_DETAILS_BY_ID,
  USER_ORDERS,
  USER_FAV_COINS,
} from "@env";

const SellModal = ({ modalVisible, setModalVisible, id, symbol }) => {
  const [data, setData] = useState([]);
  const userId = useSelector((state) => state.userReducer.userId);
  const authToken = useSelector((state) => state.userReducer.authToken);
  const [calculatedQuantity, setCalculatedQuantity] = useState(0);
  const [exchangePrice, setExchangePrice] = useState(0);
  const [calculatedProfit, setCalculatedProfit] = useState("Total profit");
  const { navigate } = useNavigation();
  const [exchangePriceIsValid, setExchangePriceIsValid] = useState(false);
  const [calculatedQuantityIsValid, setCalculatedQuantityIsValid] =
    useState(false);

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
        .then((data) => {
          let symbolData = data.filter((item) => item.symbol === symbol);
          let symbolQuantity = symbolData.map((item) => item.quantity);
          setData(symbolQuantity);
        })
        .catch((error) => console.error(error));
    }, [])
  );

  function currentPriceOnClick() {
    fetch(CRYPTO_DETAILS_BY_ID + id)
      .then((res) => res.json())
      .then((data) =>
        setExchangePrice(data.market_data.current_price.usd.toString())
      );
    calcTotalProfit();
  }

  function coinQuantityOnClick() {
    setCalculatedQuantity(data.toString());
    calcTotalProfit();
  }

  const calcTotalProfit = () => {
    if (
      isNaN(exchangePrice / calculatedQuantity) ||
      !isFinite(exchangePrice / calculatedQuantity)
    ) {
      setCalculatedProfit("0");
    } else {
      setCalculatedProfit((exchangePrice * calculatedQuantity).toFixed(2));
    }
  };

  const validateExchangeRatio = (value) => {
    let re1 = /^[1-9]{1}[0-9]*\.?[0-9]{0,2}$/;
    let re2 = /^[0]{1}\.[0-9]{1,10}$/;
    setExchangePrice(value);
    if (re1.test(value) || re2.test(value)) {
      setExchangePriceIsValid(false);
    } else {
      setExchangePriceIsValid(true);
    }
  };

  const validateCalculatedQuantity = (value) => {
    let re1 = /^[0-9][0-9]*\.?[0-9]+/;
    let re2 = /^[0]{1}\.?[0-9]{1,10}$/;
    let re3 = /^[1-9]{1}$/;
    setCalculatedQuantity(value);
    if (re1.test(value) || re2.test(value) || re3.test(value)) {
      setCalculatedQuantityIsValid(false);
    } else {
      setCalculatedQuantityIsValid(true);
    }
  };

  const dataToDb = {
    symbol: symbol,
    user: userId,
    exchange_ratio: exchangePrice,
    quantity: calculatedQuantity,
    invested: calculatedProfit,
    trade_type: "sell",
  };

  const sendOrderInfo = (data) => {
    fetch(BACKEND_API_KEY + USER_ORDERS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token" + " " + authToken,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const checkConditions = () => {
    if (
      !userId ||
      !symbol ||
      !exchangePrice ||
      !calculatedQuantity ||
      !calculatedProfit
    ) {
      Alert.alert("Invalid data", "Fill in all fields", [
        {
          text: "Confirm",
        },
      ]);
    } else if (calculatedQuantity > data) {
      Alert.alert("Invalid data", "Incorrect amount", [
        {
          text: "Confirm",
        },
      ]);
    } else if (calculatedProfit < 15) {
      Alert.alert(
        "Invalid data",
        "Profit is too low. Should be greater or equal to 15$",
        [
          {
            text: "Confirm",
          },
        ]
      );
    } else {
      sendOrderInfo(dataToDb);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={!modalVisible}
      >
        <View style={styles.mainContainer}>
          <View style={styles.modalHeaderAndFList}>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={30}
              color="white"
              onPress={() => setModalVisible(!modalVisible)}
            />
            <Text style={styles.detailsText}>TRADE DETAILS</Text>
            <Text style={styles.detailsText}>Wallet: {data}</Text>
            <View style={styles.windowsAlign}>
              <TouchableOpacity onPress={() => currentPriceOnClick()}>
                <Text style={styles.symbolTextButton}>
                  {symbol.toUpperCase()}
                </Text>
              </TouchableOpacity>
              <View>
                <TextInput
                  style={styles.textInputStyle}
                  underlineColorAndroid="transparent"
                  placeholder="Price Per Coin"
                  placeholderTextColor="#EDE6D6"
                  value={exchangePrice}
                  onChange={calcTotalProfit}
                  onChangeText={(text) => {
                    setExchangePrice(parseFloat(text));
                    validateExchangeRatio(text, data);
                  }}
                  onEndEditing={calcTotalProfit}
                />
                {exchangePriceIsValid ? (
                  <Text style={styles.invalidFormat}>Invalid price format</Text>
                ) : null}
              </View>
            </View>
            <View style={styles.windowsAlign}>
              <TouchableOpacity onPress={() => coinQuantityOnClick()}>
                <Text style={styles.symbolTextButton}>Quantity</Text>
              </TouchableOpacity>
              <View>
                <TextInput
                  style={styles.textInputStyle}
                  underlineColorAndroid="transparent"
                  placeholder="e.g. 0.01"
                  placeholderTextColor="#EDE6D6"
                  value={calculatedQuantity}
                  onChange={calcTotalProfit}
                  onChangeText={(text) => {
                    setCalculatedQuantity(parseFloat(text));
                    validateCalculatedQuantity(text);
                  }}
                  onEndEditing={calcTotalProfit}
                />
                {calculatedQuantityIsValid ? (
                  <Text style={styles.invalidFormat}>Invalid quantity</Text>
                ) : null}
              </View>
            </View>
            <View style={styles.windowsAlign}>
              <Text style={styles.symbolTextButton}>$</Text>
              <TextInput
                style={styles.textInputStyle}
                underlineColorAndroid="transparent"
                placeholder="Total profit"
                placeholderTextColor="#EDE6D6"
                value={`${calculatedProfit}`}
                editable={false}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Pressable
                style={styles.button}
                onPress={() => {
                  checkConditions(),
                    setModalVisible(!modalVisible),
                    navigate("HomeScreen");
                }}
              >
                <Text style={styles.textStyle}>SELL</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SellModal;
