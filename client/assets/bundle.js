(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function removePreviousPosts() {
    const postList = document.querySelectorAll("article")
    Array.from(postList)
    postList.forEach(element => {
        element.remove()
    });
}

function createPosts(data) {
    removePreviousPosts()
      for (let i = data.length - 1; i >= 0; i--) {
        
      const newArticle = document.createElement('article');
        
      const post  = document.createElement('div');
      post.classList.add("post");
      post.textContent = data[i].message;
  
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
  
      if (!!(data[i].comments)) {
        data[i].comments.forEach(comment => {
            const currentComment = document.createElement("p");
            currentComment.textContent = comment;
            comments.append(currentComment);
          });
      } 

      
  
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
  
      newArticle.id = data[i].id;
  
      document.querySelector('main').append(newArticle)
        
    }
    
    
      
    
  }

module.exports = {createPosts};

},{}],2:[function(require,module,exports){
// const { response } = require("../../server/app");
const helpers = require("./helpers");

const apiDomain = "http://localhost:3000/"

const formSubmit = document.getElementById("formSubmit")


formSubmit.addEventListener("click", (e) => {
  console.log(e.target)
  console.log()

const data = {
  message: document.getElementById("newPostText").value
}
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }

  fetch(`${apiDomain}posts/new`, options)
  .then(response => response.json())
  .then(obj => {
    console.log(obj)
    helpers.createPosts(obj)
  })
  .catch(error => console.log(error));
})




//========= THESE ARE WORKING METHODS TO GET THE DATA FROM OUR API






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
  .then(data => { helpers.createPosts(data)})
  .catch(error => console.log(error));






},{"./helpers":1}]},{},[2]);
