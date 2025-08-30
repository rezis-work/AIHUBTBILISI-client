import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import apolloClient from "./constants/apollo-client";
import router from "./components/Routes";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import SnackbarComponent from "./components/snackbar/SnackbarComponent";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Container>
          <Guard>
            <RouterProvider router={router} />
          </Guard>
        </Container>
        <SnackbarComponent />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
