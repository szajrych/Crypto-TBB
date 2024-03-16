import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ANDROID_ID, EXPO_ID, IOS_ID, GOOGLE_API } from "@env";

const RegisterScreen = () => {
  const { navigate } = useNavigation();
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [request, fullResult, promptAsync] = Google.useAuthRequest({
    scopes: ["email", "profile", "openid"],
    androidClientId: ANDROID_ID,
    iosClientId: IOS_ID,
    expoClientId: EXPO_ID,
  });
  useEffect(() => {
    if (fullResult?.type === "success") {
      setAccessToken(fullResult.authentication.accessToken);
    }
  }, [fullResult]);

  const getUserData = async () => {
    let userInfoResponse = await fetch(GOOGLE_API, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    userInfoResponse.json().then((data) => {
      setUserInfo(data);
      navigate("WelcomeScreen", { data });
    });
  };

  return (
    <View style={{ marginTop: 0 }}>
      <Image
        source={require("./../../../assets/images/logo_tbb_crypto.png")}
        style={{
          width: 512,
          height: 256,
          alignSelf: "center",
          marginLeft: 20,
        }}
      />
      <Text style={styles.appNameContainer}>TRY BEFORE BUY</Text>
      <Text style={styles.descriptionContainer}>
        Explore the world of cryptocurrencies!
      </Text>
      <TouchableOpacity
        style={styles.googleContainer}
        onPress={
          accessToken
            ? getUserData
            : () => promptAsync({ useProxy: true, showInRecents: true })
        }
      >
        <AntDesign name="google" size={26} color="black" />
        {userInfo ? (
          <Text style={styles.googleText}>Sign in as {userInfo.name}</Text>
        ) : (
          <Text style={styles.googleText}>Sign in with Google!</Text>
        )}
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          marginTop: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
            alignSelf: "center",
          }}
        >
          Data provided by CoinGecko
        </Text>
        <Image
          source={require("./../../../assets/images/coingecko_logo.png")}
          style={{
            width: 25,
            height: 25,
            marginLeft: 5,
            alignSelf: "center",
          }}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
