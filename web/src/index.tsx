import { ApolloProvider } from "@apollo/react-hooks";
import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import Cookies from "js-cookie";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GRAPHQL_URL } from "./utils/config";

const httpLink = createHttpLink({
  uri: GRAPHQL_URL
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("jwt");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider>
      <CSSReset />
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
