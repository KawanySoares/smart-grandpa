import React from 'react';
import styleCode from './styleCode';
import { View, Text} from 'react-native'
import { FiraSans_500Medium, useFonts } from '@expo-google-fonts/fira-sans';

export function CodeScreen({ navigation }){
    const [fonteLoaded] = useFonts({
        FiraSans_500Medium,
    
      });
      
      if(!fonteLoaded){
        return null;
      }




return(
  <View style={styleCode.container}>
     <Text style={styleCode.title}>Login</Text>
  </View>

       
        




)}