import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import React from "react";
import HomeScreen from './src/screens/HomeScreen';
import ExpandInfo from './src/screens/ExpandInfo';
import WalletScreen from './src/screens/WalletScreen';
import { Provider } from "react-redux";
import { Store } from './src/redux/store';
import RegisterScreen from './src/screens/RegisterScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SimulationScreen from './src/screens/SimulationScreen';
import WaitingListScreen from './src/screens/WaitingListScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

function HomeScreenStack() {
  return(
    <Tab.Navigator screenOptions={({route}) => ({
      showIcon: true,
      tabBarStyle: { position:'absolute', backgroundColor:'#C0C0C0', borderTopLeftRadius: 30, borderTopRightRadius: 30 },
      tabBarIcon: ({color}) => {
        if (route.name === "Home") {
          return <AntDesign name="home" size={24} color="black" />;
        }
        else if (route.name === "Wallet") {
          return <AntDesign name="wallet" size={24} color="black" />;
        }
        else if (route.name === "Orders") {
          return <FontAwesome5 name="list-alt" size={24} color="black" />;
        }
        else if (route.name === "History") {
          return <MaterialCommunityIcons name="account-details-outline" size={24} color="black"  />;
        }
      },
      tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
    })}

    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Wallet" component={WalletScreenStack} options={{ headerShown: false }} />
      <Tab.Screen name="Orders" component={WaitingListScreen} options={{ headerShown: false }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ headerShown: false }}  />
    </Tab.Navigator>
  );
}

const WalletScreenStack = () => {
   return(
     <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ contentStyle:{backgroundColor: "#0d0d0d"} }}> 
         <Stack.Screen name="WalletScreen" component={WalletScreen} options={{ headerShown: false }} />
         <Stack.Screen name="SimulationScreen" component={SimulationScreen} options={{ headerShown: false }} />
       </Stack.Navigator> 
         );
}

const MyTheme = {
  dark: false,
  colors: {
    background: '#0d0d0d',
    border: 'rgb(0d, 0d, 0d)',
  },
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store = {Store}>
      <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName='RegisterScreen' options={{headerShown: false}} >
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreenStack} options={{ headerShown: false }} />
        <Stack.Screen name="ExpandInfo" component={ExpandInfo} options={{ headerShown: false }} />
      </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
});

