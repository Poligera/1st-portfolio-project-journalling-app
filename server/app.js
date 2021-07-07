const express = require("express");
const cors = require("cors");
const app = express();
const Post = require("./model");
const data = require("../data.json");
const { response } = require("express");
require('dotenv').config()
const axios = require('axios').default;



//MIDDLEWARE
app.use(cors());
app.use(express.json());

//GET
app.get("/posts", (req, res) => {
  res.send(Post.all);
});

app.get("/posts/comments/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (id > Post.all.length || !id) {
      throw new Error("item not found");
    }
    const post = Post.getPost(id);
    res.send(post.comments);
  } catch (error) {
    res.statusCode = 404;
    res.send(error.message);
  }
});

app.get("/gifs/:search", (req, res) => {

  // Construct the url we're going to send to giphy
  const search = req.params.search;
  const url = `https://api.giphy.com/v1/gifs/search?&api_key=${process.env.GIPHYAPIKEY}&q=${search}&limit=20`

  axios.get(url)
  .then(function (response) {
    res.send(response.data.data)
  })
  .catch(function (error) {
    res.send(error.message)
  })
})

//POST

app.post("/posts/new", (req, res) => {

  console.log(req.body);

  Post.addPost(req.body);
  res.statusCode = 201;
  res.send(Post.all);
});

app.post("/posts/comments/new/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const comment = req.body.comment;
    if (id > Post.all.length || !id) {
      throw new Error("item not found");
    }
    Post.addComment(id, comment);
    const updatedPost = Post.getPost(id);
    res.statusCode = 201;
    res.send(updatedPost);
  } catch (error) {
    res.statusCode = 404;
    res.send(error.message);
  }
});

//UPDATE

app.put("/posts/reactions/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const targetReaction = req.body.target;
  Post.updateReactions(id, targetReaction);
  res.send("updated");
});

module.exports = app;
