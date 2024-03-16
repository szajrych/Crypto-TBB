import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalHeaderAndFlist: {
      height: 350,
      width: 300,
      margin: 20,
      marginTop: 10,
      backgroundColor: "#191919",
      borderRadius: 20,
      padding: 5,
      alignItems: "center",
      shadowColor: "#fff",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor: "#4169E1"
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    detailsText: {
      marginBottom: 15,
      textAlign: "center",
      color:"white",
      fontSize: 18,
      fontWeight: 'bold',
    },
    textInputStyle: {
      alignSelf: 'center',
      justifyContent: 'center',
      color: "white",
      height: 40,
      marginTop: 0,
      marginBottom: 10,
      marginLeft: 0,
      marginRight: 0,
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      backgroundColor: '#404040',
    },
    symbolTextButton: {
        justifyContent: 'center',
        color: '#fff',
        alignSelf: 'center',
        fontWeight: 'bold',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
    },
    invalidFormat: {
      color: 'red',
      fontSize: 14,
      fontWeight: 'bold',
    },
    windowsAlign: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  });
  
  export default styles;