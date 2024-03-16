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
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
  BACKEND_API_KEY,
  USER_WALLET_INFO,
  CRYPTO_DETAILS_BY_ID,
  USER_ORDERS,
} from "@env";

const TradeModal = ({ modalVisible, setModalVisible, id, symbol }) => {
  const [inputBuyPrice, setInputBuyPrice] = useState(0);
  const [quantity, setQuantity] = useState("e.g. 0.1");
  const [isCurrentPrice, setIsCurrentPrice] = useState();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userReducer.userId);
  const authToken = useSelector((state) => state.userReducer.authToken);

  const [newData, setNewData] = useState([]);

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token" + " " + authToken,
    },
  };

  useFocusEffect(
    React.useCallback(() => {
      const url = BACKEND_API_KEY + USER_WALLET_INFO + userId;
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          let available_funds = data.filter((item) => item.available_funds);
          setNewData(available_funds);
        })

        .catch((error) => console.log(error));
    }, [])
  );

  const fundsLeft = newData.map((item) => item.available_funds);

  const [exchangeRatioIsValid, setExchangeRatioIsValid] = useState(false);
  const [buyPriceIsValid, setBuyPriceIsValid] = useState(false);

  const validateExchangeRatio = (value) => {
    let re1 = /^([1-9]{1}[0-9]*\.?[0-9]{0,2}$)/;
    let re2 = /^([0]{1}\.[0-9]{1,10}$)/;
    setIsCurrentPrice(value);
    if (re1.test(value) || re2.test(value)) {
      setExchangeRatioIsValid(false);
    } else {
      setExchangeRatioIsValid(true);
    }
  };

  const validateInputBuyPrice = (value) => {
    let re = /^([1-9]{1}[0-9]*\.?[0-9]{0,2}$)/;
    setInputBuyPrice(value);
    if (re.test(value) && value >= 15) {
      setBuyPriceIsValid(false);
    } else {
      setBuyPriceIsValid(true);
    }
  };

  const calcQuantity = () => {
    if (
      isNaN(inputBuyPrice / isCurrentPrice) ||
      !isFinite(inputBuyPrice / isCurrentPrice)
    ) {
      setQuantity("0");
    } else {
      setQuantity(
        Math.floor((inputBuyPrice / isCurrentPrice) * 1000000) / 1000000
      );
    }
  };

  function currentPriceOnClick() {
    fetch(CRYPTO_DETAILS_BY_ID + id)
      .then((res) => res.json())
      .then((data) =>
        setIsCurrentPrice(data.market_data.current_price.usd.toString())
      );
  }

  const data = {
    symbol: symbol,
    user: userId,
    exchange_ratio: isCurrentPrice,
    quantity: quantity,
    invested: inputBuyPrice,
    trade_type: "buy",
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

  const fundsLeftConv = parseFloat(fundsLeft);
  const investedAmount = parseFloat(inputBuyPrice);
  const checkConditions = () => {
    if (!userId || !symbol || !isCurrentPrice || !quantity || !inputBuyPrice) {
      Alert.alert("Invalid data", "Fill in all fields", [
        {
          text: "Confirm",
        },
      ]);
    } else if (investedAmount > fundsLeftConv) {
      Alert.alert("Invalid data", "You don't have enough funds", [
        {
          text: "Confirm",
        },
      ]);
    } else {
      sendOrderInfo(data);
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
          <View style={styles.modalHeaderAndFlist}>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={30}
              color="white"
              onPress={() => setModalVisible(!modalVisible)}
            />
            <Text style={styles.detailsText}>TRADE DETAILS</Text>
            <Text style={styles.detailsText}>Available funds: {fundsLeft}</Text>
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
                  value={isCurrentPrice}
                  onChange={calcQuantity}
                  onChangeText={(text) => {
                    setIsCurrentPrice(parseFloat(text));
                    validateExchangeRatio(text);
                  }}
                  onEndEditing={calcQuantity}
                />
                {exchangeRatioIsValid ? (
                  <Text style={styles.invalidFormat}>Invalid price format</Text>
                ) : (
                  <Text></Text>
                )}
              </View>
            </View>
            <View style={styles.windowsAlign}>
              <Text style={styles.symbolTextButton}>Quantity</Text>
              <TextInput
                style={styles.textInputStyle}
                value={`${quantity}`}
                editable={false}
              />
            </View>
            <View style={styles.windowsAlign}>
              <Text style={styles.symbolTextButton}>$</Text>
              <View>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Total Spent"
                  placeholderTextColor="#EDE6D6"
                  value={inputBuyPrice}
                  onChangeText={(text) => {
                    setInputBuyPrice(parseFloat(text));
                    validateInputBuyPrice(text);
                  }}
                  onEndEditing={calcQuantity}
                />
                {buyPriceIsValid ? (
                  <Text style={styles.invalidFormat}>Invalid data</Text>
                ) : (
                  <Text></Text>
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignSelf: "center",
                justifyContent: "center",
              }}
            ></View>
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
                <Text style={styles.textStyle}>BUY</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TradeModal;
