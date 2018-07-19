// @flow

import React from 'react';
import { View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { StackNavigator } from 'react-navigation';

import EmployeesList from './src/containers/EmployeesList';

const Client = new ApolloClient({
  link: new HttpLink({ uri: '<SERVER_URL>' }),
  cache: new InMemoryCache(),
});

const MainNavigator = StackNavigator({
  employeesList: { screen: EmployeesList },
});

const App = () => (
  <ApolloProvider client={Client}>
    <View style={{ flex: 1 }}>
      <MainNavigator />
    </View>
  </ApolloProvider>
);

export default App;
