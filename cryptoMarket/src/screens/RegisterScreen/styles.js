import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    appNameContainer: {
        color: "white",
        fontWeight: "800",
        fontStyle: 'italic',
        fontSize: 32,
        alignSelf: "center",
        marginTop: 15,
    },
    descriptionContainer: {
        color: "#fff",
        fontWeight: "500",
        fontSize: 16,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10,
        letterSpacing: 1,
    },
    googleContainer: {
        flexDirection: 'row',
        width: "85%",
        marginTop:10,
        justifyContent: 'center',
        borderRadius:10,
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    googleText: {
        color: 'black',
        fontSize: 18,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginLeft: 15,
    },
});

export default styles;