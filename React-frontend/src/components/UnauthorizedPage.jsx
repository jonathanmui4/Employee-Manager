import React from 'react'
// import { useHistory } from 'react-router-dom';
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'

const UnauthorizedPage = () => {
    // const history = useHistory();
    const goBack = () => {
        history.back();
    }
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Unauthorized Access
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Unauthorized Access
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          You are not authorized to view this page.
        </Typography>
        <Button variant="contained" color="primary" onClick={goBack}>
          Go Back
        </Button>
      </Container>
    </div>
  )
}

export default UnauthorizedPage