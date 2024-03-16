import { View, Text, ActivityIndicator } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
      <Text style={{ color: "#fff" }}>Loading data...</Text>
    </View>
  );
};

export default LoadingScreen;
