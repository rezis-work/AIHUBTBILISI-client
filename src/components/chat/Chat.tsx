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

const Chat = () => {
  const { _id } = useParams();
  const [message, setMessage] = useState<string>("");
  const { data } = useGetChat({ _id: _id! });
  const [createMessage] = useCreateMessage(_id!);
  const { data: messagesData } = useGetMessages({ chatId: _id! });
  const divRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const scrollToBottom = () =>
    divRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    setMessage("");
    scrollToBottom();
  }, [location, message]);

  const handleCreateMessage = async () => {
    await createMessage({
      variables: {
        createMessageInput: { content: message, chatId: _id! },
      },
    });
    setMessage("");
    scrollToBottom();
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
        {messagesData?.messages.map((message) => (
          <Grid
            container
            key={message._id}
            alignItems="center"
            marginBottom="1rem"
          >
            <Grid
              size={{
                xs: 3,
                md: 1,
              }}
            >
              <Avatar src="" sx={{ width: 52, height: 52 }} />
            </Grid>
            <Grid
              size={{
                xs: 9,
                md: 11,
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
                  {new Date(message.createdAt).toLocaleTimeString()}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        ))}
        <div ref={divRef}></div>
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
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
