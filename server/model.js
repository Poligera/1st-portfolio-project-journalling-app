const postData = require("../data.json");

class Post {
  constructor(data) {
    this.id = data.id;
    this.message = data.message;
    this.reactions = {happy: 0, sad: 0, shocked: 0};
    this.comments = data.comments; //! This is for testing, change to empty array later
  }
  static get all() {
    return postData
  }
  static addPost(data) {
    const id = postData.length + 1;
    const newPost = new Post({id: id, ...data});
    postData.push(newPost);
  }
  static getPost(id) {
    const posts = Post.all;
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === id) {
        return posts[i]
      }
    }
  }
  static addComment(id, comment) {
    const targetPost = Post.getPost(id);
    targetPost.comments.push(comment)
  }
  static updateReactions(id, targetReaction) {
    const targetPost = Post.getPost(id);
    targetPost.reaction[targetReaction] ++
    return targetPost
  }

}

module.exports = Post;
