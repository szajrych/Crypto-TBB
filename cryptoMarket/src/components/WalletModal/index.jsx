import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import styles from "./styles";
import CryptoClickedItem from "../CryptoClickedItem";

const ListComponent = ({ data, renderItem }) => {
  return (
    <FlatList
      style={{ height: 350, flexGrow: 0 }}
      contentContainerStyle={{
        padding: 20,
        marginBottom: 10,
        marginTop: 10,
      }}
      ListFooterComponent={<View style={{ height: 10 }} />}
      data={data}
      renderItem={renderItem}
    />
  );
};

const WalletModal = ({
  modalVisible,
  setModalVisible,
  setFavList,
  fetchFavCoins,
  coinList,
}) => {
  const [search, setSearch] = useState("");
  const [filteredCryptocurrencies, setFilteredCryptocurrencies] = useState([]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = coinList.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredCryptocurrencies(newData);
      setSearch(text);
    } else {
      setFilteredCryptocurrencies(coinList);
      setSearch(text);
    }
  };

  const getCoinsData = () => {
    return filteredCryptocurrencies.length > 0
      ? filteredCryptocurrencies
      : coinList;
  };

  const renderItem = ({ item }) => (
    <CryptoClickedItem
      item={item}
      fetchFavCoins={fetchFavCoins}
      setFavList={setFavList}
    />
  );
  return (
    <View style={styles.modalContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={!modalVisible}
      >
        <View style={styles.modalHeaderAndFlist}>
          <Text style={styles.headerText}>ADD TO LIST</Text>
          <TextInput
            style={styles.searchTextInput}
            onChangeText={searchFilterFunction}
            underlineColorAndroid="transparent"
            placeholder="Search"
            placeholderTextColor="#C0C0C0"
          />
          <ListComponent data={getCoinsData()} renderItem={renderItem} />
          <Pressable
            style={styles.hideButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>HIDE</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default WalletModal;
