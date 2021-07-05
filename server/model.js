const postData = require("../data.json");

class Post {
  constructor(data) {
    this.id = data.id;
    this.message = data.message;
    this.reactions = {happy: 0, sad: 0, shocked: 0};
    this.comments = [];
  }
  static get all() {
    return postData
  }
  static addPost(data) {
    const id = postData.length + 1;
    const newPost = new Post({id: id, ...data});
    postData.push(newPost);
  }
}

module.exports = Post;
