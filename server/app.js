const express = require("express");
const cors = require("cors");
const app = express();
const Post = require("./model");
const data = require("../data.json")

//MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send(data))

Post.addPost({message: "hi"})
console.log(Post.all)

module.exports = app;
