const mongoose = require('mongoose');
// const {Schema} = mongoose;
const blogSchema = new mongoose.Schema({
    title:{
       type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
},{timestamps:true});

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog