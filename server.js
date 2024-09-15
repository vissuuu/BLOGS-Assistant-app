const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Blog = require("./models/blog.model");
// const {Blog} = require('./models/blog.model');
require("dotenv").config;
const blogRoutes = require("./routes/blogRoutes");
const PORT = 5000;

// to resolve cors errors
app.use(cors({}));
app.use(express.json());

app.use(blogRoutes);

mongoose
  .connect(
    "mongodb+srv://vissuuu:wjBd2B1DpKsCHuE0@cluster0.3qx2n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    // console.log(result);
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/generate-blog", blogRoutes); // Ensure routes are linked
