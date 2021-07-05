// const helpers = require("./helpers");
const button = document.querySelector(".add-button");
const article = document.querySelector("article");
const divPost = document.createElement('div');
const divReactions = document.createElement('div');
const divComments = document.createElement('div');
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
function createPost(){
  divPost.className = "post";
  divPost.textContent = testData.message;
}

// Creating "reactions" div underneath the post:
function createReactions(){
  divReactions.className = "reactions";
  const divEmojiBox = document.createElement('div');
  divEmojiBox.id = "emoji-box";
  divEmojiBox.textContent = testData.reactions;
  const collapsibleBtn = document.createElement('button');
  collapsibleBtn.className = "collapsible";
  collapsibleBtn.type = "button";
  divReactions.appendChild(divEmojiBox);
  divReactions.appendChild(collapsibleBtn);
}

// Creating "comments" div for every post:
function createPostComments(){
  divComments.className = "comments";
  const h4 = document.createElement('h4');
  h4.textContent = "COMMENTS"
  divComments.appendChild(h4);
  //
  for (const comment of testData.comments) {
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
function postEntry(testData){
  createPost();
  article.appendChild(divPost);
  createReactions();
  article.appendChild(divReactions);
  createPostComments();
  article.appendChild(divComments);
  article.id = testData.id;
};