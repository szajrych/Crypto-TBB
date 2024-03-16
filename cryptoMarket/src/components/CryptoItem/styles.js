import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    CryptoName: { 
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    CryptoPrice: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    CryptoText: { 
      color: '#fff',
      fontSize: 15,
    },
    CryptoContainer: { 
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#0d0d0d',
      padding: 15,
      justifyContent: 'space-between',
    },
    rankNumber: {
      fontWeight: 'bold',
      color: '#000',
      fontSize: 15,
    },
    rankNumberBg: { 
      backgroundColor: '#d9d9d9',
      paddingHorizontal: 3,
      borderRadius: 5,
      marginRight: 3,
      flexDirection: 'row',
    },
  });

export default styles;