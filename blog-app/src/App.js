import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import BlogDetails from "./components/BlogDetails";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Blog Management
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/blogs">
            View Blogs
          </Button>
          <Button color="inherit" component={Link} to="/blog/create">
            Create Blog
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 3 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blog/create" element={<BlogForm />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/blog/edit/:id" element={<BlogForm />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
