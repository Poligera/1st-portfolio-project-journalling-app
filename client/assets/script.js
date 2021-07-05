
// const { response } = require("../../server/app");
const helpers = require("./helpers");

const apiDomain = "http://localhost:3000/"

const form = document.querySelector("form");

function initialBindings() {
  form.addEventListener("submit",postEntry);
}

// helpers.test;

const postEntry = () => {
  console.log("Thank you for posting");
};

//========= THESE ARE WORKING METHODS TO GET THE DATA FROM OUR API

// //===== Add a post
// const data = {
//   message: "hey, I posted this from our client."
// }
//   const options = {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data)
//   }

// fetch(`${apiDomain}posts/new`, options)
//   .then(response => response.json())
//   .then(obj => console.log(obj))
//   .catch(error => console.log(error));



// //===== Get all data
// fetch(`${apiDomain}posts`)
//   .then(response => response.json())
//   .then(obj => console.log(obj))
//   .catch(error => console.log(error));




// //===== Update reactions

// const data = {target: "smile"}

// const options = {
//       method: "PUT",
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data)
//     }
  
//   fetch(`${apiDomain}posts/reactions/update/1`, options)
//     .then(response => response.json())
//     .then(obj => console.log(obj))
//     .catch(error => console.log(error));

// //===== Add a post
// const data = {
//   comment: "hey, I posted this from our client."
// }
//   const options = {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data)
//   }

// fetch(`${apiDomain}posts/comments/new/1`, options)
//   .then(response => response.json())
//   .then(obj => console.log(obj))
//   .catch(error => console.log(error));




initialBindings()


// const helpers = require("./helpers");
const button = document.querySelector(".add-button");
const article = document.querySelector("article");
const divPost = createEl('div');
const divReactions = createEl('div');
const collapsibleBtn = createEl('button');
const divEmojiBox = createEl('div');
const divComments = createEl('div');
const h4 = createEl('h4');

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
  };

  const addCommentBtn = createEl('button');
  addClass(addCommentBtn, "add");
  addText(addCommentBtn, "+");
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
