// const helpers = require("./helpers");
const button = document.querySelector(".add-button");
const article = document.querySelector("article");
//
// Function that creates a DOM element:
function createEl (el){
  return document.createElement(el)
};

// 
// Function that adds a class to a DOM element:
function addClass(el, className) {
  return el.className = className;
}

// 
// Function that displays a DOM element:
function displayEl(parent, child) {
  return parent.appendChild(child)
}

const divPost = createEl('div');
const divReactions = createEl('div');
const collapsibleBtn = createEl('button');
const divEmojiBox = createEl('div');
const divComments = createEl('div');
const h4 = createEl('h4');

addClass(divComments, "comments");
h4.textContent = "COMMENTS";
displayEl(divComments, h4);
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
  addClass(divPost, "post");
  divPost.textContent = data.message;
}

// Creating "reactions" div underneath the post:
function createReactions(data){
  addClass(divReactions, "reactions");
  divEmojiBox.id = "emoji-box";
  divEmojiBox.textContent = data.reactions;
  addClass(collapsibleBtn, "collapsible");
  collapsibleBtn.type = "button";
  displayEl(divReactions, divEmojiBox);
  displayEl(divReactions, collapsibleBtn);
}

// Creating "comments" div for every post:
function createPostComments(data){
  for (const comment of data.comments) {
    const commentParagraph = createEl('p');
    addClass(commentParagraph, "comment-paragraph");
    commentParagraph.textContent = comment;
    displayEl(divComments, commentParagraph);
  };

  const addCommentBtn = createEl('button');
  addClass(addCommentBtn, "add");
  addCommentBtn.textContent = "+";
  displayEl(divComments, addCommentBtn);
}

// Displaying a post with all its reactions and comments:
function postEntry(){
  createPost(testData);
  displayEl(article, divPost);
  createReactions(testData);
  displayEl(article, divReactions);
  createPostComments(testData);
  // Displaying all comments if clicked on "collapsible" button:
  collapsibleBtn.addEventListener('click', e =>
    displayEl(article, divComments));
  article.id = testData.id;
};