// src/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://devextension.origa.market/graphql/',
  cache: new InMemoryCache(),
});

export default client;
