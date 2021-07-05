const express = require("express");
const cors = require("cors");
const app = express();
const Post = require("./model");
const data = require("../data.json")

//MIDDLEWARE
app.use(cors());
app.use(express.json());

// Root get.
app.get('/', (req, res) => res.send(data))

//ADD TEST DATA
Post.addPost({message: "hi", comments: ['Comment 1', 'Comment 2']})
console.log(Post.all)




//GET
app.get('/posts', (req, res) => {
    res.send(Post.all);
});

app.get('/posts/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = Post.getPost(id);
    res.send(post.comments);
});

//POST

app.post('/posts/new', (req, res) => {
    res.send('you asked to add a new post');
});

//====== This works
app.post('posts/comments/new/:Index', (req, res) => {
    const id = parseInt(req.params.id);
    Post.addComment(id, "I'm a new comment")
    const updatedComments = Post.getPost(id)

    res.send(updatedComments);
});

//UPDATE

app.put('/posts/reactions/update/:Index', (req, res) => {
    // TODO get the reaction type from the body.
    Post.updateReactions()
    res.send('you asked to update reaction count')
})




module.exports = app;
