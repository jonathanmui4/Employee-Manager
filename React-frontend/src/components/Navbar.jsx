import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { getJWTCookie, clearJWTCookie } from '../util/jwtCookieUtil';

export default function ButtonAppBar({ role }) {
  const handleLogout = () => {
    if (!getJWTCookie()) {
      return;
    }

    fetch("http://localhost:8080/logout", {
            headers: {
              Authorization: `Bearer ${getJWTCookie()}`,
            },
            method: "GET",
        })
            .then((response) => {
                if (response.status === 200) {
                    clearJWTCookie();
                    window.location.href = "/login";
                }
            })
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {role === "MANAGER" ? "Manager Dashboard" : "Employee Dashboard"}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}