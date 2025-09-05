import { useQuery } from "@apollo/client/react";
import { graphql } from "../gql";
import type { QueryChatsArgs } from "../gql/graphql";

export const getChatsDocument = graphql(`
  query Chats($skip: Int!, $limit: Int!) {
    chats(skip: $skip, limit: $limit) {
      ...ChatFragment
    }
  }
`);

const useGetChats = (args: QueryChatsArgs) => {
  return useQuery(getChatsDocument, { variables: args });
};

export { useGetChats };
