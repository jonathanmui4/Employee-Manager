import React from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./Navbar";

const theme = createTheme({
    palette: {
        primary: {
            main: "#007bff",
        },
        secondary: {
            main: "#f5c2c7",
        },
    },
});

function Dashboard() {
    const location = useLocation();
    const { state } = location;
    const userFirstName = state ? state.userFirstName : '';
    const userLastName = state ? state.userLastName : '';
    const userRole = state ? state.userRole : '';

    return (
        <>
            <Navbar />
            <ThemeProvider theme={theme}>
                <Container maxWidth="lg">
                    <Box sx={{ my: 4 }}>
                        <Typography
                            variant="h4"
                            align="center"
                            gutterBottom
                            sx={{ mb: 2 }}
                        >
                            Welcome {userRole} {userFirstName} {userLastName}!
                        </Typography>
                        <Typography variant="body1" align="center" gutterBottom>
                            This is a simple welcome page built with Material
                            UI.
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                mt: 4,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ mx: 2 }}
                            >
                                Managers only
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default Dashboard;
