import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    welcomeContainer: {
        backgroundColor: '#0d0d0d',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 115,
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#fff',
        paddingTop: 10,
    },
    profilePicture: {
        alignSelf: 'center',
        width: 100,
        height: 100,
        paddingVertical: 10,
    },
    emailText: {
        alignSelf: 'center',
        fontSize: 24,
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
    },
});

export default styles;