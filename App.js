// @flow

import React from 'react';
import { View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { StackNavigator } from 'react-navigation';

import EmployeesList from './src/containers/EmployeesList';
import EmployeeForm from './src/containers/EmployeeForm';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  link: new HttpLink({ uri: '<SERVER_URL>' }),
  cache: new InMemoryCache(),
  defaultOptions,
});

const MainNavigator = StackNavigator({
  employeesList: { screen: EmployeesList },
  employeeForm: { screen: EmployeeForm },
});

const App = () => (
  <ApolloProvider client={client}>
    <View style={{ flex: 1 }}>
      <MainNavigator />
    </View>
  </ApolloProvider>
);

export default App;
