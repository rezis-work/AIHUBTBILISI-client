import { Divider, List, Stack } from "@mui/material";
import ChatListItem from "./chat-list-item/ChatListItem";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import { useEffect, useState } from "react";
import ChatListAdd from "./chat-list-add/ChatListAd";
import { useGetChats } from "../../hooks/use-get-chats";
import { usePath } from "../../hooks/use-path";

export default function ChatList() {
  const [chatListAddVisible, setChatListAddVisible] = useState<boolean>(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const { data, loading } = useGetChats();
  const { path } = usePath();

  useEffect(() => {
    const pathSplit = path.split("chats/");
    if (pathSplit.length === 2) {
      setSelectedChatId(pathSplit[1]);
    }
  }, [path]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setChatListAddVisible(false)}
      />
      <Stack>
        <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
        <Divider sx={{ width: "100%", maxWidth: 360 }} />
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {data?.chats
            .map((chat) => (
              <ChatListItem
                key={chat._id}
                chat={chat}
                selected={selectedChatId === chat._id}
              />
            ))
            .reverse()}
        </List>
      </Stack>
    </>
  );
}
