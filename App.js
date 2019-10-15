import React, {useState , useEffect} from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import {AppLoading, Font, Assets} from 'expo';
import { InMemoryCache} from 'apollo-cache-inmemory';
import {persistCache} from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost'
import apolloClientOptions from './apollo';
import {ApolloProvider} from 'react-apollo-hooks'

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
    <View>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
    </ApolloProvider>:
    <AppLoading />
  );
}

