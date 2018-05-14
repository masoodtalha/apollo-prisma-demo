import { ApolloClient, HttpLink, InMemoryCache, split } from 'apollo-client-preset';
import {getMainDefinition} from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true
  }
});
const link = split(
  // split based on operation type
  ({ query }) => {
    console.log("^^^^^^ Query: ",query);
    const { kind, operation } = getMainDefinition(query);
    console.log("^^^^^^ operation: ", kind, operation);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
}

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({}),
  defaultOptions
})

export default client