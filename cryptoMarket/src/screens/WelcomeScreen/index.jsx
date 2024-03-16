import { View, Text, Image } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../../components/IconButton";
import { useEffect } from "react";
import { setUserId, getAuthToken } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_SIGN_KEY } from "@env";

const WelcomeScreen = ({ route }) => {
  const userInfo = route.params.data;
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const data = {
    email: userInfo.email,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const url = BACKEND_SIGN_KEY;

  const userId = useSelector((state) => state.userReducer.userId);
  const authToken = useSelector((state) => state.userReducer.authToken);
  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setUserId(data.id));
        dispatch(getAuthToken(data.token));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  return (
    <View style={styles.welcomeContainer}>
      <Image source={{ uri: userInfo.picture }} style={styles.profilePicture} />
      <Text style={styles.welcomeText}>Hi {userInfo.name}!</Text>
      <Text style={styles.emailText}>{userInfo.email}</Text>
      <IconButton onPress={() => navigate("HomeScreen")} text="CONTINUE" />
    </View>
  );
};

export default WelcomeScreen;
