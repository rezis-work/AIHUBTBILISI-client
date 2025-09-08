import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/use-get-chat";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/use-create-message";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/use-get-messages";
import { PAGE_SIZE } from "../../constants/page-size";
import { useCountMessages } from "../../hooks/use-count-messages";
import InfiniteScroll from "react-infinite-scroller";

const Chat = () => {
  const { _id } = useParams();
  const [message, setMessage] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);
  const { data } = useGetChat({ _id: _id! });
  const [createMessage] = useCreateMessage();
  const {
    data: messagesData,
    fetchMore,
    loading,
  } = useGetMessages({
    chatId: _id!,
    skip: 0,
    limit: PAGE_SIZE,
  });
  const divRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { messagesCount, countMessages } = useCountMessages(_id!);

  useEffect(() => {
    countMessages();
  }, [countMessages]);

  const scrollToBottom = () =>
    divRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    if (messagesData?.messages && messagesData.messages.length <= PAGE_SIZE) {
      setMessage("");
      scrollToBottom();
    }
  }, [location.pathname, messagesData?.messages]);

  const handleCreateMessage = async () => {
    await createMessage({
      variables: {
        createMessageInput: { content: message, chatId: _id! },
      },
    });
    setMessage("");
    scrollToBottom();
  };

  useEffect(() => {
    if (messagesData?.messages && messagesCount !== undefined) {
      setHasMore(messagesData.messages.length < messagesCount);
    }
  }, [messagesData?.messages, messagesCount]);

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;
    await fetchMore({
      variables: {
        skip: messagesData?.messages.length,
      },
    });
  };

  return (
    <Stack
      sx={{
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <h1>{data?.chat.name}</h1>
      <Box sx={{ maxHeight: "70vh", overflow: "auto" }}>
        <InfiniteScroll
          pageStart={0}
          isReverse={true}
          loadMore={handleLoadMore}
          hasMore={hasMore}
          useWindow={false}
          initialLoad={false}
        >
          {messagesData &&
            [...messagesData.messages]
              .sort((messageA, messageB) => {
                return (
                  new Date(messageA.createdAt).getTime() -
                  new Date(messageB.createdAt).getTime()
                );
              })
              .map((message) => (
                <Grid
                  container
                  key={message._id}
                  alignItems="center"
                  marginBottom="1rem"
                >
                  <Grid
                    size={{
                      xs: 2,
                      lg: 1,
                    }}
                  >
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      spacing={1}
                    >
                      <Avatar
                        src={message.user.imageUrl}
                        sx={{ width: 52, height: 52 }}
                      />
                      <Typography variant="caption">
                        {message.user.username}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid
                    size={{
                      xs: 10,
                      lg: 11,
                    }}
                  >
                    <Stack>
                      <Paper sx={{ width: "fit-content" }}>
                        <Typography
                          sx={{
                            padding: "0.9rem",
                          }}
                        >
                          {message.content}
                        </Typography>
                      </Paper>
                      <Typography
                        variant="caption"
                        sx={{
                          marginLeft: "0.25rem",
                        }}
                      >
                        {new Date(message.createdAt).toLocaleTimeString()} -{" "}
                        {new Date(message.createdAt).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
        </InfiniteScroll>
        <div ref={divRef}></div>
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
          margin: "1rem 0",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              await handleCreateMessage();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={handleCreateMessage}
          color="primary"
          sx={{ p: "10px" }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
