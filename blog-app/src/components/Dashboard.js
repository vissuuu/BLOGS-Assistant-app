import React from "react";
import { Button, Box, Typography, Container, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Container maxWidth="md">
      <Box textAlign="center" my={5}>
        <Typography variant="h4" gutterBottom>
          Blog Dashboard
        </Typography>
        <Typography variant="h6" paragraph>
          Welcome! Manage your blogs efficiently.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
              <Typography variant="h6">Create a New Blog</Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/blog/create"
                sx={{ mt: 2 }}
              >
                Create Blog
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
              <Typography variant="h6">View Blog Drafts</Typography>
              <Button
                variant="outlined"
                color="secondary"
                component={Link}
                to="/blogs"
                sx={{ mt: 2 }}
              >
                View Drafts
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
