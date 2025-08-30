import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { API_URL } from "./urls";
import { excludedRoutes } from "./excluded-routes";
import router from "../components/Routes";
import client from "./apollo-client";

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
    final.errors[0].extensions.originalError.statusCode === 401
  ) {
    if (
      !excludedRoutes.includes(
        window.location.pathname as (typeof excludedRoutes)[number]
      )
    ) {
      router.navigate("/login");
      client.resetStore();
    }
  }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
});

export default apolloClient;
