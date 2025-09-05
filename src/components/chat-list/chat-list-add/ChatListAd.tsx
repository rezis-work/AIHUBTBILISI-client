import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCreateChat } from "../../../hooks/use-create-chat";
import { UNKNOWN_ERROR_MESSAGE } from "../../../constants/errors";
import router from "../../Routes";

interface ChatListAddProps {
  open: boolean;
  handleClose: () => void;
}

const ChatListAdd = ({ open, handleClose }: ChatListAddProps) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [createChat] = useCreateChat();

  const onClose = () => {
    setError(undefined);
    setName(undefined);
    handleClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" component="h2">
            Add Chat
          </Typography>
          <TextField
            label="Name"
            value={name}
            error={!!error}
            helperText={error ? error : ""}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="outlined"
            onClick={async () => {
              if (!name) {
                setError("Name is required");
                return;
              }
              try {
                const chat = await createChat({
                  variables: {
                    createChatInput: {
                      name,
                    },
                  },
                });
                onClose();
                router.navigate(`/chats/${chat.data?.createChat._id}`);
              } catch {
                setError(UNKNOWN_ERROR_MESSAGE);
              }
            }}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ChatListAdd;
