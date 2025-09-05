import type { ApolloCache } from "@apollo/client";
import type { Message } from "../gql/graphql";
import { getChatsDocument } from "../hooks/use-get-chats";

export const updateLatestMessage = (cache: ApolloCache, message: Message) => {
  const chats = [
    ...(cache.readQuery({ query: getChatsDocument })?.chats || []),
  ];
  const cachedChatIndex = chats.findIndex(
    (chat) => chat._id === message.chatId
  );
  if (cachedChatIndex === -1) {
    return;
  }
  const cachedChat = chats[cachedChatIndex];
  const cachedChatCopy = { ...cachedChat };
  cachedChatCopy.latestMessage = message;
  chats[cachedChatIndex] = cachedChatCopy;
  cache.writeQuery({
    query: getChatsDocument,
    data: {
      chats,
    },
  });
};
