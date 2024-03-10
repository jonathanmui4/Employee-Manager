import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { AppBar, Toolbar } from "@mui/material";
import Navbar from "../Navbar";

const ManagerDash = () => {
    const handleClick = () => {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    };

    return (
        <div>
            <Navbar role={"MANAGER"} />
            <Container maxWidth="sm">
                <Typography variant="h3" align="center" gutterBottom>
                    Welcome Mr Manager!
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                    Please enjoy this amazing content:
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                >
                    Click Here!
                </Button>
            </Container>
        </div>
    );
};

export default ManagerDash;
