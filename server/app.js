const express = require("express");
const cors = require("cors");
const app = express();
const Post = require("./model");
const data = require("../data.json")

//MIDDLEWARE
app.use(cors());
app.use(express.json());



//GET
app.get('/posts', (req, res) => {
    res.send(Post.all);
});

app.get('/posts/comments/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (id > Post.all.length || !id) {
            throw new Error('item not found')
        }
        const post = Post.getPost(id);
        res.send(post.comments);
    } catch (error) {
        res.statusCode = 404; 
        res.send(error.message)
    }
});




//POST

app.post('/posts/new', (req, res) => {
    console.log(req.body.message)  
    

    const updatedPostList = Post.addPost(req.body)

    res.send(Post.all);
});


app.post('/posts/comments/new/:id', (req, res) => {
   
        const id = parseInt(req.params.id);
        const comment = req.body.comment
        Post.addComment(id, comment)
        const updatedPost = Post.getPost(id)
        
        res.send(updatedPost); 
});



//UPDATE

app.put('/posts/reactions/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const targetReaction = req.body.target
    Post.updateReactions(id, targetReaction)
    res.send()
})




module.exports = app;