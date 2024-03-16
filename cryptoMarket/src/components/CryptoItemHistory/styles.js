import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    CryptoName: {  
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    TradeInfo: {
      color: '#404040',
      fontSize: 14,
    },
    CryptoPrice: { 
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    CryptoContainer: {  
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#404040',
      padding: 10,
      justifyContent: 'space-between',
    },
    tradeType: { 
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'space-between',
    }
  });

export default styles;