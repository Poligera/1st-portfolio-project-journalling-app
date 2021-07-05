// const helpers = require("./helpers");
const button = document.querySelector(".add-button");
const article = document.querySelector("article");
const divPost = document.createElement('div');
const divReactions = document.createElement('div');
const collapsibleBtn = document.createElement('button');
const divEmojiBox = document.createElement('div');
const divComments = document.createElement('div');
const h4 = document.createElement('h4');
//
const testData = {
  "id": 1,
  "message": "I want to be famous",
  "reactions": {"smile": 4, "celebrate": 12, "love": 7},
  "comments": ["this is my post", "I liked it"]
}
//
button.addEventListener("click", postEntry);
// helpers.test;

// Creating a single post:
function createPost(data){
  divPost.className = "post";
  divPost.textContent = data.message;
}

// Creating "reactions" div underneath the post:
function createReactions(data){
  divReactions.className = "reactions";
  divEmojiBox.id = "emoji-box";
  divEmojiBox.textContent = data.reactions;
  collapsibleBtn.className = "collapsible";
  collapsibleBtn.type = "button";
  divReactions.appendChild(divEmojiBox);
  divReactions.appendChild(collapsibleBtn);
}

// Creating "comments" div for every post:
function createPostComments(data){
  divComments.className = "comments";
  h4.textContent = "COMMENTS";
  divComments.appendChild(h4);
  //
  for (const comment of data.comments) {
    const commentParagraph = document.createElement('p');
    commentParagraph.className = "comment-paragraph";
    commentParagraph.textContent = comment;
    divComments.appendChild(commentParagraph);
  };

  const addCommentBtn = document.createElement('button');
  addCommentBtn.className = "add";
  addCommentBtn.textContent = "+";
  divComments.appendChild(addCommentBtn);
}

// Displaying a post with all its reactions and comments:
function postEntry(){
  createPost(testData);
  article.appendChild(divPost);
  createReactions(testData);
  article.appendChild(divReactions);
  createPostComments(testData);
  article.appendChild(divComments);
  article.id = testData.id;
};