import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../Navbar";

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

function Dashboard({ firstName, lastName, role}) {
    const navigate = useNavigate();

    return (
        <>
            <Navbar role={"EMPLOYEE"} />
            <ThemeProvider theme={theme}>
                <Container maxWidth="lg">
                    <Box sx={{ my: 4 }}>
                        <Typography
                            variant="h4"
                            align="center"
                            gutterBottom
                            sx={{ mb: 2 }}
                        >
                            {/* Welcome {userRole} {userFirstName} {userLastName}! */}
                            Welcome {role} {firstName} {lastName}!
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
                            {role === "MANAGER" ? (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ mx: 2 }}
                                    onClick={() => navigate("/dashboard/manager")}
                                >
                                    Managers only
                                </Button>
                            ) : null}
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default Dashboard;
