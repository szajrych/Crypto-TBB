import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    CryptoName: { 
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    TradeInfo: {
      color: '#C0C0C0',
      fontSize: 14,
    },
    CryptoPrice: { 
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
      textAlign: 'right', 
    },
    CryptoText: { 
      color: '#fff',
      fontSize: 15,
    },
    CryptoContainer: { 
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#404040',
      padding: 15,
      justifyContent: 'space-between',
    },
    rankNumber: { 
      fontWeight: 'bold',
      color: '#000',
      fontSize: 15,
    },
    rankNumberBg: {
      backgroundColor: '#e3e4e9',
      paddingHorizontal: 3,
      borderRadius: 5,
      marginRight: 3,
      flexDirection: 'row',
    },
    
  });

export default styles;