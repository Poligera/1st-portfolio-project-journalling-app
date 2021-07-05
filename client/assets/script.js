// const helpers = require("./helpers");
const main = document.querySelector("main");
const button = document.querySelector(".add-button");
const article = document.querySelector("article");
const divPost = createEl('div');
const divReactions = createEl('div');
const collapsibleBtn = createEl('button');
const divEmojiBox = createEl('div');
const divComments = createEl('div');
const h4 = createEl('h4');
const modal = document.querySelector(".modal");
const postCommentBtn = document.querySelector(".post-comment")

addClass(divComments, "comments");
addText(h4, "COMMENTS");
displayEl(divComments, h4);

const testData = {
  "id": 1,
  "message": "I want to be famous",
  "reactions": {"smile": 4, "celebrate": 12, "love": 7},
  "comments": ["this is my post", "I liked it"]
}

window.onload = postEntry();
// Function that creates a DOM element:
function createEl (el){
  return document.createElement(el)
};

// 
// Function that adds a class to a DOM element:
function addClass(el, className) {
  return el.className = className;
}

function addText(el, text) {
  return el.textContent = text;
}

// 
// Function that displays a DOM element:
function displayEl(parent, child) {
  return parent.appendChild(child)
}

// button.addEventListener("click", postEntry);
// helpers.test;

// Creating a single post:
function createPost(data){
  addClass(divPost, "post");
  addText(divPost, data.message);
}

// Creating "reactions" div underneath the post:
function createReactions(data){
  addClass(divReactions, "reactions");
  divEmojiBox.id = "emoji-box";
  addText(divEmojiBox, data.reactions);
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
    addText(commentParagraph, comment);
    displayEl(divComments, commentParagraph);
  }
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
  // Every post entry gets an ID to access data stored at server: 
  article.id = testData.id;
  addComment();
};

// Displaying all comments under each post if button is clicked:
function addComment() {
  const addCommentBtn = createEl('button');
  addClass(addCommentBtn, "add");
  addText(addCommentBtn, "+");
  displayEl(divComments, addCommentBtn);

  // A popup form to add a comment and blurred "main" background:
  addCommentBtn.addEventListener("click", e => {
    main.style.filter = "blur(10px)";
    modal.style.zIndex = "1";
    modal.style.display = "initial";
  })
  
  // A preliminary event listener to submit a comment (using "click" for now, for testing):
  postCommentBtn.addEventListener("click", e => {
    e.preventDefault();
    console.log("Comment has been submitted");
    modal.style = "initial";
    main.style = "initial";
  })
}
