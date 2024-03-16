import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    CryptoContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#404040',
      padding: 15,    
      paddingHorizontal: 0,
      justifyContent: 'space-between',  
    },
    rankNumber: {
      fontWeight: 'bold',
      color: '#000',
      fontSize: 16,
      alignSelf:'center',
    },
    rankNumberBg: {
      backgroundColor: '#e3e4e9',
      paddingHorizontal: 5,
      borderRadius: 5,
      marginRight: 0,
      flexDirection: 'row',
    },
});


export default styles;