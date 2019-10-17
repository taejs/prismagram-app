import React,{ createContext, useContext, useState} from 'react';
import {AsyncStorage} from 'react-native';

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const logUserIn = async () => {
    try{
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    }catch(e){
      throw new Error(e);
    }
  }
  const logUserOut = async () => {
    try{
      await AsyncStorage.setItem('isLoggedIn', 'false');
      setIsLoggedIn(false);
    }catch(e){
      throw new Error(e);
    }
  }

  return <AuthContext.Provider>children</AuthContext.Provider>
}