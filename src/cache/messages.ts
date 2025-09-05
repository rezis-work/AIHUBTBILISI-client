import type { ApolloCache } from "@apollo/client";
import type { Message } from "../gql/graphql";
import { getMessagesDocument } from "../hooks/use-get-messages";
import { PAGE_SIZE } from "../constants/page-size";

export const updateMessages = (cache: ApolloCache, message: Message) => {
  const messagesQuery = {
    query: getMessagesDocument,
    variables: { chatId: message.chatId, skip: 0, limit: PAGE_SIZE },
  };
  const messages = cache.readQuery({ ...messagesQuery });

  cache.writeQuery({
    ...messagesQuery,
    data: {
      messages: (messages?.messages || []).concat(message),
    },
  });
};
