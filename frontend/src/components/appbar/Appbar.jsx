import React, { useState } from "react";
import * as AiIcons from "react-icons/ai";
import { AccountCircle } from "@mui/icons-material/";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  FormControlLabel,
  Menu,
  MenuItem,
  Toolbar,
  Box,
  AppBar,
  Typography,
  IconButton,
  Switch,
  FormGroup,
  SwipeableDrawer,
  Divider,
  Container,
  Stack,
} from "@mui/material/";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "../sidebar/SidebarData";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import useToken from "../login/useToken";

export default function MenuAppBar({ removeToken, token }) {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    console.log("token removed");
    removeToken();
    navigate("/");
  };

  // <div class="MuiPaper-root-MuiDrawer-paper"

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: "#D6E7AF",
          fontSize: "15px",
        }}
        position="sticky"
      >
        <Toolbar>
          <IconButton>
            <MenuIcon onClick={() => setOpen(true)} />
            <SwipeableDrawer
              sx={{
                "& .MuiDrawer-paper": {
                  backgroundColor: "#123D35",
                },
              }}
              className="drawer"
              anchor="left"
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
            >
              <div>
                <IconButton>
                  <ChevronLeftIcon onClick={() => setOpen(false)} />
                </IconButton>
              </div>
              <Divider />
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </SwipeableDrawer>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to={"/home"}
              style={{ color: "white", textDecoration: "none" }}
            >
              Virtual Fridge
            </Link>
          </Typography>
          {auth && (
            <Stack direction={"row"}>
              <MenuItem onClick={handleSignout}>Logout</MenuItem>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
