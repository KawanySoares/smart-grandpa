import { StyleSheet } from 'react-native';

const styleSenha = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#D5CBF8',
    },  
  
    title:{
      fontSize: 25,
      color: '#3F3847',
      marginTop: 85,
      textAlign:'center',
      fontWeight: '600',
      fontFamily:'FiraSans_500Medium',
    },
  
     input:{
       height: 50,
       backgroundColor: '#FFFF',
       paddingLeft: 25,
       marginHorizontal: 20,
       borderRadius: 20,
       fontSize: 18,
       borderColor: '#E4E7EB',
       marginTop: 55,
       fontFamily:'FiraSans_500Medium'
     },
  
     inputIcon:{
      marginTop:-25,
     },
  
     icon:{
      position: 'absolute',
      right: 35,
      top: 65,
     },
  
     btnEnter:{
      height:60,
      borderRadius:15,
      backgroundColor:'#9C80BE',
      alignItems:'center',
      justifyContent:'center',
      marginTop:40,
      marginBottom:10,
      marginLeft:60,
      marginRight:60,
      fontSize:30,
     },
  
   
   
  
  
  



})
export default styleSenha;