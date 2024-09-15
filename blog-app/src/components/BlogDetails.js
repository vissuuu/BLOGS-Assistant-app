import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Box, Button } from "@mui/material";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/blog/${id}`).then((res) => {
      setBlog(res.data);
    });
  }, [id]);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4">{blog.title}</Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          By {blog.author}
        </Typography>
        <Typography variant="body1" paragraph>
          {blog.description}
        </Typography>
        <Button variant="outlined" component={Link} to={`/blog/edit/${id}`}>
          Edit Blog
        </Button>
      </Box>
    </Container>
  );
};

export default BlogDetails;
