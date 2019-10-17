import React, {useState , useEffect} from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {Asset} from 'expo-asset';
import { Ionicons} from '@expo/vector-icons';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import { InMemoryCache} from 'apollo-cache-inmemory';
import {persistCache} from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost'
import apolloClientOptions from './apollo';
import {ApolloProvider} from 'react-apollo-hooks';
import {ThemeProvider} from 'styled-components';
import style from './styles';
import NavControllers from './components/NavControllers';
import {AuthProvider} from './AuthContext';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font
      })
      await Assets.loadAsync([require('./assets/logo.png')]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage : AsyncStorage

      });
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions
      })
      setLoaded(true);
      setClient(client);
    }catch(e){
      console.log(e);

    }
  }
  useEffect(() => {
    preLoad();
  }, [])
  return (
    loaded && client?
    <ApolloProvider client={client}>
      <ThemeProvider theme={style}>
        <AuthProvider>
          <NavControllers></NavControllers>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
    : <AppLoading />
  );
}

