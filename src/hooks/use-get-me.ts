import { useQuery } from "@apollo/client/react";
import type { User } from "../models/User";
import { gql } from "@apollo/client";

const GET_ME_QUERY = gql`
  query Me {
    me {
      _id
      email
    }
  }
`;

const useGetMe = () => {
  return useQuery<{ me: User }>(GET_ME_QUERY);
};

export { useGetMe };
