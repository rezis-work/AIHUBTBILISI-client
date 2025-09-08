import { useQuery } from "@apollo/client/react";
import { graphql } from "../gql";

const getMeDocument = graphql(`
  query Me {
    me {
      ...userFrangment
    }
  }
`);

const useGetMe = () => {
  return useQuery(getMeDocument);
};

export { useGetMe };
