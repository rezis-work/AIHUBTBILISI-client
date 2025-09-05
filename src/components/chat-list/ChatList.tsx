import { Box, Divider, Stack } from "@mui/material";
import ChatListItem from "./chat-list-item/ChatListItem";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import { useEffect, useState } from "react";
import ChatListAdd from "./chat-list-add/ChatListAd";
import { useGetChats } from "../../hooks/use-get-chats";
import { usePath } from "../../hooks/use-path";
import { useMessageCreated } from "../../hooks/use-message-created";
import { PAGE_SIZE } from "../../constants/page-size";
import InfiniteScroll from "react-infinite-scroller";
import { useCountChats } from "../../hooks/use-count-chats";

export default function ChatList() {
  const [chatListAddVisible, setChatListAddVisible] = useState<boolean>(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const { data, fetchMore, loading } = useGetChats({
    skip: 0,
    limit: PAGE_SIZE,
  });
  const { path } = usePath();
  const { chatsCount, countChats } = useCountChats();
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    countChats();
  }, [countChats]);

  useMessageCreated({ chatIds: data?.chats.map((chat) => chat._id) ?? [] });

  useEffect(() => {
    const pathSplit = path.split("chats/");
    if (pathSplit.length === 2) {
      setSelectedChatId(pathSplit[1]);
    }
  }, [path]);

  useEffect(() => {
    if (data?.chats && chatsCount !== undefined) {
      setHasMore(data.chats.length < chatsCount);
    }
  }, [data?.chats, chatsCount]);

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;
    await fetchMore({
      variables: {
        skip: data?.chats.length,
      },
    });
  };

  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setChatListAddVisible(false)}
      />
      <Stack>
        <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
        <Divider sx={{ width: "100%", maxWidth: 360 }} />
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={handleLoadMore}
            hasMore={hasMore}
            useWindow={false}
          >
            {data?.chats &&
              [...data.chats]
                .sort((chatA, chatB) => {
                  if (!chatA.latestMessage) {
                    return -1;
                  }
                  return (
                    new Date(chatA.latestMessage?.createdAt).getTime() -
                    new Date(chatB.latestMessage?.createdAt).getTime()
                  );
                })
                .map((chat) => (
                  <ChatListItem
                    key={chat._id}
                    chat={chat}
                    selected={selectedChatId === chat._id}
                  />
                ))
                .reverse()}
          </InfiniteScroll>
        </Box>
      </Stack>
    </>
  );
}
