(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// function test() {
//   return 2 + 2;
// }

// function testTwo() {
//   return 2 + 2;
// }

module.exports = {};

},{}],2:[function(require,module,exports){
// const { response } = require("../../server/app");
const helpers = require("./helpers");

const apiDomain = "http://localhost:3000/"

const form = document.querySelector("form");

function initialBindings() {
  form.addEventListener("submit",postEntry);
}

// helpers.test;

// const postEntry = () => {
//   console.log("Thank you for posting");
// };

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


  fetch(`${apiDomain}posts`)
  .then(response => response.json())
  .then(data => {
    createPosts(data)
    
  }).catch(error => console.log(error));




function createPosts(data) {
  data.forEach(entry => {
    const newArticle = document.createElement('article');
      
    const post  = document.createElement('div');
    post.classList.add("post");
    post.textContent = entry.message;

    newArticle.append(post);

    const reactions = document.createElement('div');
    reactions.classList.add("reactions");
    const emojiBox = document.createElement('div');
    emojiBox.id = "emoji-box";
    const button = document.createElement('button');
    button.classList.add("collapsible");

    

    reactions.append(emojiBox);
    reactions.append(button);
    newArticle.append(reactions);

    const comments = document.createElement('div');
    comments.classList.add('comments');

    const headline = document.createElement("h4");
    headline.textContent = "Comments";

    const addCommentBtn = document.createElement('button');
    addCommentBtn.classList.add("add");
    addCommentBtn.textContent = "+";
  
    comments.append(headline);
    comments.append(addCommentBtn)

    entry.comments.forEach(comment => {
      const currentComment = document.createElement("p");
      currentComment.textContent = comment;
      comments.append(currentComment);
    });

    newArticle.append(comments);

    button.addEventListener("click", function() {
      this.classList.toggle("active");
      var content = comments
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });

    newArticle.id = entry.id;

    document.querySelector('main').append(newArticle)
  
    
  });
}

},{"./helpers":1}]},{},[2]);
