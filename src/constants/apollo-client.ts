import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { API_URL } from "./urls";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: `${API_URL}/graphql` }),
});

export default apolloClient;
