import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { API_URL, WS_URL } from "./urls";
import { excludedRoutes } from "./excluded-routes";
import { onLogout } from "../utils/logout";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

interface ErrorResponse {
  data: null;
  errors: ErrorResponseData[];
}

interface ErrorResponseData {
  extensions: {
    code: string;
    stacktrace: string[];
    originalError: {
      message: string;
      statusCode: number;
    };
  };
  locations: {
    line: number;
    column: number;
  }[];
  message: string;
  path: string[];
}

const logoutLink = new ErrorLink((err) => {
  const { result } = err;
  const final: ErrorResponse = result as ErrorResponse;
  if (
    final.errors.length &&
    final.errors[0].extensions?.originalError?.statusCode === 401
  ) {
    if (
      !excludedRoutes.includes(
        window.location.pathname as (typeof excludedRoutes)[number]
      )
    ) {
      onLogout();
    }
  }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });
const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${WS_URL}/graphql`,
  })
);

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          chats: {
            keyArgs: false,
            merge,
          },
          messages: {
            keyArgs: ["chatId"],
            merge,
          },
        },
      },
    },
  }),
  link: logoutLink.concat(splitLink),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function merge(existing: any, incoming: any, { args }: any) {
  const merged = existing ? existing.slice(0) : [];
  for (let i = 0; i < incoming.length; ++i) {
    merged[args.skip + i] = incoming[i];
  }
  return merged;
}

export default apolloClient;
