import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import * as authService from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
const NavBar = ({ onLogout }) => {
  const currentUser = authService.getCurrentUser();
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: "green" }} position="static">
        <Toolbar>
          {currentUser ? (
            <div>
              <Typography align="left">
                Welcome <b>{currentUser.name}!</b>
              </Typography>
            </div>
          ) : (
            <Typography
              align="center"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer", ml: 23 }}
              onClick={() => navigate("/")}
            >
              Todo App
            </Typography>
          )}

          {currentUser ? (
            <>
              <Typography
                align="center"
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Todo App
              </Typography>
              <Button color="inherit" onClick={onLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button LinkComponent={Link} to="/register" color="inherit">
                Register
              </Button>
              <Button LinkComponent={Link} to="/login" color="inherit">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
