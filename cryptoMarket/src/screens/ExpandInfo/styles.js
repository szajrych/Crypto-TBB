import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    priceContainer: { 
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        letterSpacing: 1,
        alignSelf: 'center',
    },
    nameContainer: {  
        color: "grey", 
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginRight: 0,
    },
    infoContainer: {  
        padding: 10,
    },
    priceChangeContainer: { 
        color: "white",
        fontSize: 17,
        fontWeight: "600",
    },
    marketCapContainer: {
        color: "white",
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttonsContainer: { 
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#404040',
        paddingTop: 0,
    },
    changeChartContainer: {  
        flexDirection: "row",
        marginTop:2.5,
        paddingTop:0,
        paddingBottom:0,
        borderRadius:10,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        justifyContent: 'space-around',
        borderColor: "#0d0d0d",
    },    
    descriptionContainer: { 
        color: "grey", 
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginRight: 0,
        justifyContent:'flex-start',
    },
    nameAndChange: { 
        flexDirection: "row",
        justifyContent: 'center',
        alignSelf: 'center',
        
    },
    CandleChartInfo: { 
        color: '#fff',
        fontSize: 14,
    },
    CandleChartDateInfo: { 
        color: '#fff',
        fontSize: 14,
        alignSelf: 'center',
    },
    candleTextParams: { 
        color: '#fff',
        fontSize: 14,
        alignSelf: 'center',
    }
});

export default styles;