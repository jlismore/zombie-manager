import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import apolloLogger from "apollo-link-logger";
import fragmentMatcher from "./generated/fragment-matcher.json";

const cache = new InMemoryCache({
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData: fragmentMatcher
  }),
  freezeResults: true
});

const storageUrl = "http://localhost:4000/graphql";

const httpLink = new HttpLink({
  uri: storageUrl,
  credentials: "same-origin"
});

const link = ApolloLink.from([apolloLogger, httpLink]);

export const client = new ApolloClient({
  link,
  cache,
  queryDeduplication: true,
  assumeImmutableResults: true
});
