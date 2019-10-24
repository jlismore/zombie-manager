import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { client } from "./apolloClient";
import { Routes } from "./routes";
import { unregister } from "./serviceWorker";
import "./fontAwesome";

import "@blueprintjs/core/lib/css/blueprint.css";
import "normalize.css/normalize.css";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById("root")
);

unregister();
