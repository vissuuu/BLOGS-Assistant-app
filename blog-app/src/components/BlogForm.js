import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [prompt, setPrompt] = useState(""); // State for LLM prompt
  const [generatedContent, setGeneratedContent] = useState(""); // Store LLM generated content
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/blog/${id}`).then((res) => {
        const blog = res.data;
        setTitle(blog.title);
        setDescription(blog.description);
        setAuthor(blog.author);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, description, author };

    if (id) {
      await axios.put(`http://localhost:5000/blog/${id}`, data);
    } else {
      await axios.post("http://localhost:5000/create-blog", data);
    }
    navigate("/blogs");
  };

  const generateBlogContent = async () => {
    try {
      const response = await axios.post("http://localhost:5000/generate-blog", {
        prompt, 
      });
      console.log(response.data)
      // setGeneratedContent(response.data.output);
      setDescription(response.data.output); // Auto-fill the blog description
    } catch (error) {
      console.error("Error generating blog:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" my={4}>
        <Typography variant="h4">
          {id ? "Edit Blog" : "Create a Blog"}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <TextField
          label="Author"
          fullWidth
          margin="normal"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        {/* New section for LLM prompt */}
        <TextField
          label="Generate Blog Content with AI"
          fullWidth
          margin="normal"
          multiline
          rows={2}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <Button
          variant="outlined"
          color="secondary"
          onClick={generateBlogContent}
          sx={{ mt: 2 }}
        >
          Generate Blog with AI
        </Button>

        {/* Display Generated Content */}
        {generatedContent && (
          <Box mt={4}>
            <Typography variant="h6">Generated Content:</Typography>
            <Typography variant="body1">{generatedContent}</Typography>
          </Box>
        )}

        <Box textAlign="center" mt={4}>
          <Button type="submit" variant="contained" color="primary">
            {id ? "Update Blog" : "Save Blog"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default BlogForm;
