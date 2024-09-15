const express = require("express");
const router = express.Router();
const Blog = require("../models/blog.model");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// get all blogs
router.get("/get-all-blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.send({ count: blogs.length, data: blogs });
  } catch (err) {
    console.log(err);
    req.status(400).send({ message: "Something went wrong !" });
  }
});
// get single blog
router.get("/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Blog.findById(id);
    console.log(response);
    res.send(response);
  } catch (err) {
    console.log(err);
    req.status(400).send({ message: "Something went wrong !" });
  }
});

// update a blog
router.put("/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await Blog.findByIdAndUpdate(id, data, {
      returnOriginal: false,
    });
    console.log(response);
    res.send(response);
  } catch (err) {
    console.log(err);
    req.status(400).send({ message: "Something went wrong !" });
  }
});

// delete blogs
router.delete("/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Blog.findByIdAndDelete(id);
    console.log(response);
    res.send("Success !");
  } catch (err) {
    console.log(err);
    req.status(400).send({ message: "Something went wrong !" });
  }
});

// create blogs
router.post("/create-blog", async (req, res) => {
  try {
    const data = req.body;
    const blog = new Blog(data);
    const response = await blog.save();
    // await sendEmail(data, email)
    console.log(response);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Something went wrong !" });
  }
});

// Add this new route for LLM-generated blogs
router.post("/generate-blog", async (req, res) => {
  const { prompt } = req.body;
  try {
    const apiKey = "AIzaSyC2Aod52z5k7hY4qiDotrH34UKWEbGMd_Y";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    let toGivePrompt;
    if (prompt == "") {
      toGivePrompt = `You are an AI Chatbot being used for our project. Provide me a random small blog for my project as a student I can read for the day  give me a blog on biopic I am a 2nd year student and I want to read it to myself for self growth tell me about technology`;
    }
    toGivePrompt = `You are an AI Chatbot being used for our project. You need to help with making draft for my blogs . You can deny to do other tasks other than bloging but perform the tasks that's within your capabilities.  
      Now the prompt to generate a blog: ${prompt}`;

    const result = await model.generateContent(toGivePrompt);
    const output = result.response.text();

    // Return the generated content
    res.status(200).json({ output });
  } catch (err) {
    console.log("Error running chatbot", err.message);
    res.status(500).json({ error: err.message });
  }
});

const sendEmail = async (draft, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your Draft",
      text: `Your Saved Blog: ${draft}`,
    };

    await transporter.sendMail(mailOptions);

    return "Mail Sent";
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

module.exports = router;
