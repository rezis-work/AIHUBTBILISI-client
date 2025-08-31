import { AppBar, IconButton, Toolbar } from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";

interface ChatListHeaderProps {
  handleAddChat: () => void;
}

const ChatListHeader = ({ handleAddChat }: ChatListHeaderProps) => {
  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ width: "100%", maxWidth: 360 }}
    >
      <Toolbar>
        <IconButton size="large" edge="start" onClick={handleAddChat}>
          <AddCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ChatListHeader;
