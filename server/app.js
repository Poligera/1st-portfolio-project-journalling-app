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
// console.log(Post.all)




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
    res.send('you asked to add a new post');
});

//====== This works
app.post('posts/comments/new/:Index', (req, res) => {
    
        Post.addComment(id, "I'm a new comment") //! hard coded at the moment.
        const updatedPost = Post.getPost(id)

        res.send(updatedPost.comments);
   
    
});

//UPDATE

app.put('/posts/reactions/update/:Index', (req, res) => {
    // TODO get the reaction type from the body.
    Post.updateReactions()
    res.send('you asked to update reaction count')
})




module.exports = app;
