import { useState } from "react";
import { type MouseEvent } from "react";
import { Box, Menu, IconButton, MenuItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import type { Page } from "../../../interfaces/page.interface";
import router from "../../Routes";

interface MobileNavigationProps {
  pages: Page[];
}

const MobileNavigation = ({ pages }: MobileNavigationProps) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {pages.map((page: Page) => (
            <MenuItem
              key={page.title}
              onClick={() => {
                router.navigate(page.path);
                handleCloseNavMenu();
              }}
            >
              <Typography sx={{ textAlign: "center" }}>{page.title}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
};

export default MobileNavigation;
