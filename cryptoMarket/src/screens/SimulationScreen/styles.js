import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainWalletInfo: {
        paddingHorizontal: 15,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        backgroundColor: "#404040",
        height:215,
    },
    balanceContainerText: { 
        color: "#fff",
        fontWeight: "bold",
        letterSpacing: 1,
        marginTop: 20,
        marginBottom: 5,
        alignItems: 'center',
        fontSize: 20,
    },
    balanceContainer: { 
        flexDirection:"row",
        color: "#fff",
        fontWeight: "bold",
        alignItems: "center",      
        justifyContent:'space-around',
        marginBottom: 5,
    },
    headerInfoText: { 
        color: "#C0C0C0",
        fontWeight: "bold",
        fontSize: 17,
    },
    headerInfoPrice: { 
        color: "#fff",
        fontWeight: "bold",
        fontSize: 25,
        letterSpacing: 1,
    },
    walletButtons: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginTop: -33,
    },
});

export default styles;
