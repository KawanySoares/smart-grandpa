import React from 'react';
import styleSenha from './styleSenha';
import { View, Text, TextInput, TouchableOpacity,Image} from 'react-native'
import { Ionicons} from '@expo/vector-icons';
import { FiraSans_500Medium, useFonts } from '@expo-google-fonts/fira-sans';



export function SenhaSreen({ navigation }){

  const [email, onChangeEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hidePass, setHidePass] = React.useState(true);
  const [fonteLoaded] = useFonts({
    FiraSans_500Medium,

  });
  
  if(!fonteLoaded){
    return null;
  }
    
  
  return(
      <View style={styleSenha.container}>

        <Text style={styleSenha.title}>Página de recuperação</Text>
      
        <TextInput
          style={styleSenha.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="E-mail"
        />


        <View style={styleSenha.inputIcon}>
        <TextInput
          style={styleSenha.input}
          onChangeText={ (texto) => setPassword(texto)}
          value={password}
          placeholder="Senha"
          secureTextEntry={hidePass}
        /> 

        <TouchableOpacity style={styleSenha.icon}  onPress={() => setHidePass(!hidePass) } >
          {hidePass ?
          <Ionicons name="eye-off" color="#9C80BE" size={25}/>
          :
          <Ionicons name="eye" color="#9C80BE" size={25}/>
          }
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styleSenha.btnEnter}>
          <Text style={{color:"#DAD0FB", fontSize:16, fontFamily:'FiraSans_500Medium',}}>Enter</Text>
          </TouchableOpacity>

        
          
      
      </View>
  );
}
