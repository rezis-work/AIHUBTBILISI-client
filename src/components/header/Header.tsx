import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Branding from "./Branding";
import MobileNavigation from "./mobile/MobileNavigation";
import MobileBranding from "./mobile/MobileBranding";
import Navigation from "./Navigation";
import Settings from "./Settings";
import { authenticatedVar } from "../../constants/authenticated";
import { useReactiveVar } from "@apollo/client/react";
import type { Page } from "../../interfaces/page.interface";

const pages = [
  {
    title: "Home",
    path: "/",
  },
] as Page[];

const unauthenticatedPages = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "Signup",
    path: "/signup",
  },
] as Page[];

function Header() {
  const authenticated = useReactiveVar(authenticatedVar);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding />
          <MobileNavigation
            pages={authenticated ? pages : unauthenticatedPages}
          />
          <MobileBranding />
          <Navigation pages={authenticated ? pages : unauthenticatedPages} />
          {authenticated && <Settings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
