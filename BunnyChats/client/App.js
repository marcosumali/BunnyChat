import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
// import ApolloClient from 'apollo-boost'
// import ApolloClient, { createNetworkInterface } from 'apollo-client';

import Home from './components/home'
import Auth from './components/auth'
import Register from './components/register'
import ChatDetail from './components/chatdetail'

const AppNav = createStackNavigator({
  Auth: { screen: Auth }, 
  Home: { screen: Home },
  Register: { screen: Register },
  ChatDetail: { screen: ChatDetail },
}, {
  initialRouteName: 'Home'
});


// const networkInterface = createNetworkInterface('http://localhost:3000/graphql');

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  defaults: {
    testing: {
      __typename: 'testing',
      name: '',
      age: 0
    }
  }
})

// const networkInterface = { uri: 'http://localhost:3000/graphql' }

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    new HttpLink({ uri: 'http://192.168.1.190:3000/graphql' })
  ])
  // networkInterface
});

// console.log('==',client)

export default class App extends React.Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <AppNav />
      </ApolloProvider>
    )
    // return (
      // <View style={styles.container}>
      //   <Text>Open up App.js to start working on your app! halo</Text>
      //   <Text>Changes you make will automatically reload.</Text>
      //   <Text>Shake your phone to open the developer menu.</Text>
      // </View>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
