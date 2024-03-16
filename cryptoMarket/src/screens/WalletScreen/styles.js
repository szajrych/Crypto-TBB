import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainWalletInfo: { 
        paddingHorizontal: 15,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        backgroundColor: "#404040",
        height:90,
    },
    balanceContainerText: { 
        color: "#fff",
        fontWeight: "bold",
        letterSpacing: 1,
        marginTop: 20,
        alignItems: 'center',
        fontSize: 24,
        alignSelf: 'center',
    },
    walletButtons: { 
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginTop: -33,
    },
});

export default styles;