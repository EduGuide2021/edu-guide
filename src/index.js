import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ApolloClient, InMemoryCache, ApolloProvider, useMutation } from "@apollo/client";

import App from "./App";

const destination = document.querySelector(".root");

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </Provider>,
  destination
);
