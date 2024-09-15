import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, List, ListItem, ListItemText, Typography, Box } from "@mui/material";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/get-all-blogs").then((res) => {
      setBlogs(res.data.data);
    });
  }, []);

  return (
    <Container maxWidth="md">
      <Box textAlign="center" my={4}>
        <Typography variant="h4">Blog Drafts</Typography>
      </Box>
      <List>
        {blogs.map((blog) => (
          <ListItem key={blog._id} button component={Link} to={`/blog/${blog._id}`}>
            <ListItemText primary={blog.title} secondary={`By ${blog.author}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default BlogList;
