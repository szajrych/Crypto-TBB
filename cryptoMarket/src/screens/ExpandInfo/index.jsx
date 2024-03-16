import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import ExpandInfoCmp from "../../components/ExpandInfoCmp";
import styles from "./styles";
import RoundButton from "../../components/RoundButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getCryptoCharts, getCryptoCandle } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../components/IconButton";
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";
import TradeModal from "../../components/TradeModal";
import SellModal from "../../components/SellModal";

const ExpandInfo = ({ route }) => {
  const marketCryptos = route.params.marketCryptos;
  const dispatch = useDispatch();

  const [sellModalVisible, setSellModalVisible] = useState(false);
  const [tradeModalVisible, setTradeModalVisible] = useState(false);
  const [displayCandleChart, setDisplayCandleChart] = useState(false);

  const {
    id,
    image,
    name,
    symbol,
    market_cap,
    current_price,
    price_change_percentage_24h,
  } = marketCryptos;

  const chartData = useSelector((state) => state.userReducer.chartData);
  const candleData = useSelector((state) => state.userReducer.candleData);
  const [timestamp, setTimestamp] = useState(30);
  const handleClickedInterval = (value) => {
    setTimestamp(value);
  };

  useEffect(() => {
    dispatch(getCryptoCharts(id, timestamp));
    dispatch(getCryptoCandle(id, timestamp));
    getCryptoCandle(name, timestamp);
  }, [timestamp]);

  const currencyFormatter = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  };

  const chartColor = price_change_percentage_24h < 0 ? "#bf0000" : "#198d19";
  const screenSize = Dimensions.get("window").width;
  const candlesDataArray = Object.values(candleData);

  return (
    <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
      {chartData.prices && (
        <LineChart.Provider
          data={chartData.prices.map(([timestamp, value]) => ({
            timestamp,
            value,
          }))}
        >
          <ExpandInfoCmp image={image} />
          <View style={styles.infoContainer}>
            <View style={{ justifyContent: "space-around" }}>
              <View style={styles.nameAndChange}>
                <Text style={styles.nameContainer}>{name}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.descriptionContainer}>24H Change</Text>
                <View
                  style={{
                    backgroundColor: chartColor,
                    paddingVertical: 5,
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: "row",
                  }}
                >
                  <Text style={styles.priceChangeContainer}>
                    {price_change_percentage_24h.toFixed(2)}%
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.descriptionContainer}>Price</Text>
                <Text style={styles.priceContainer}>
                  {currencyFormatter(current_price)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.descriptionContainer}>MCap</Text>
                <Text style={styles.marketCapContainer}>
                  {currencyFormatter(market_cap)}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.changeChartContainer}>
            <TouchableOpacity
              onPress={() => {
                setDisplayCandleChart(false);
              }}
            >
              <MaterialCommunityIcons
                name="chart-line"
                size={30}
                color="#99df73"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setDisplayCandleChart(true);
              }}
            >
              <MaterialCommunityIcons name="candle" size={30} color="#f29800" />
            </TouchableOpacity>
          </View>
          {displayCandleChart ? (
            <View>
              <CandlestickChart.Provider
                data={candlesDataArray.map(
                  ([timestamp, open, high, low, close]) => ({
                    timestamp,
                    open,
                    high,
                    low,
                    close,
                  })
                )}
              >
                <CandlestickChart height={screenSize / 2} alignSelf="center">
                  <CandlestickChart.Candles />
                  <CandlestickChart.Crosshair />
                </CandlestickChart>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.candleTextParams}>Open</Text>
                    <CandlestickChart.PriceText
                      type="open"
                      style={styles.CandleChartInfo}
                    />
                  </View>
                  <View style={{ flexDirection: "column " }}>
                    <Text style={styles.candleTextParams}>Close</Text>
                    <CandlestickChart.PriceText
                      type="close"
                      style={styles.CandleChartInfo}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <View
                    style={{ flexDirection: "column", alignSelf: "center" }}
                  >
                    <Text style={styles.candleTextParams}>High</Text>
                    <CandlestickChart.PriceText
                      type="high"
                      style={styles.CandleChartInfo}
                    />
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.candleTextParams}>Low</Text>
                    <CandlestickChart.PriceText
                      type="low"
                      style={styles.CandleChartInfo}
                    />
                  </View>
                </View>

                <CandlestickChart.DatetimeText
                  style={styles.CandleChartDateInfo}
                />
              </CandlestickChart.Provider>
            </View>
          ) : (
            <View>
              <LineChart height={screenSize / 2} alignSelf="center">
                <LineChart.Path color={chartColor} />
                <LineChart.CursorCrosshair color="white" />
              </LineChart>
              <LineChart.PriceText style={{ color: "white" }} />
              <LineChart.DatetimeText style={{ color: "white" }} />
            </View>
          )}
          <View style={styles.buttonsContainer}>
            <RoundButton name="1D" onPress={() => handleClickedInterval(1)} />
            <RoundButton name="1W" onPress={() => handleClickedInterval(7)} />
            <RoundButton name="2W" onPress={() => handleClickedInterval(14)} />
            <RoundButton name="1M" onPress={() => handleClickedInterval(30)} />
            <RoundButton name="1Y" onPress={() => handleClickedInterval(365)} />
          </View>
          <TradeModal
            modalVisible={tradeModalVisible}
            setModalVisible={setTradeModalVisible}
            id={id}
            symbol={symbol}
          />
          <SellModal
            modalVisible={sellModalVisible}
            setModalVisible={setSellModalVisible}
            id={id}
            symbol={symbol}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: -30,
            }}
          >
            <IconButton
              name="cart"
              text="BUY"
              color="black"
              onPress={() => setTradeModalVisible(true)}
            />
            <IconButton
              name="ios-logo-usd"
              text="SELL"
              color="black"
              onPress={() => setSellModalVisible(true)}
            />
          </View>
        </LineChart.Provider>
      )}
    </View>
  );
};

export default ExpandInfo;
