import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    modalContainer: { 
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40
    },
    modalHeaderAndFlist: { 
      height: 450,
      width: 330,
      margin: 20,
      marginTop: 100,
      backgroundColor: "#191919",
      borderRadius: 20,
      padding: 35,
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
    hideButton: {
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
    headerText: {
      marginBottom: 15,
      textAlign: "center",
      color:"white",
      fontSize: 18,
      fontWeight: 'bold',
    },
    searchTextInput: { 
      color: "white",
    }
  });
  
  export default styles;