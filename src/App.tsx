import {
  Container,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@mui/material";

import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import apolloClient from "./constants/apollo-client";
import router from "./components/Routes";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import SnackbarComponent from "./components/snackbar/SnackbarComponent";
import ChatList from "./components/chat-list/ChatList";
import { usePath } from "./hooks/use-path";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const { path } = usePath();
  const showChatList = path === "/" || path.includes("chats");

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          {showChatList ? (
            <Grid container>
              <Grid size={3}>
                <ChatList />
              </Grid>
              <Grid size={9}>
                <Routes />
              </Grid>
            </Grid>
          ) : (
            <Routes />
          )}
        </Guard>
        <SnackbarComponent />
      </ThemeProvider>
    </ApolloProvider>
  );
}

const Routes = () => {
  return (
    <Container sx={{ height: "100%" }}>
      <RouterProvider router={router} />
    </Container>
  );
};

export default App;
