
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const apiDomain = "http://localhost:3000/"

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
  

      // ADD EMOJI ENTRIES 
      const emojiEntries = Object.keys(data[i].reactions);

      emojiEntries.forEach(emojiType => {

        const reactionDiv = document.createElement('div');
        reactionDiv.classList.add(emojiType);
        reactionDiv.classList.add("emoji");
        
        const pContainer = document.createElement("div");
        pContainer.classList.add('pContainer');

        const reactionCount = document.createElement('p');
        reactionCount.classList.add(emojiType);
        reactionCount.textContent = data[i].reactions[emojiType];

        pContainer.append(reactionCount);
        reactionDiv.append(pContainer);
        emojiBox.append(reactionDiv);

        
      });
  
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
      comments.append(addCommentBtn);
  
      if (!!(data[i].comments)) {
        data[i].comments.forEach(comment => {
            const currentComment = document.createElement("p");
            currentComment.textContent = comment;
            comments.append(currentComment);
          });
      } 

      newArticle.append(comments);
  
  
      newArticle.id = data[i].id;
  
      document.querySelector('main').append(newArticle);
        

    }
    for (
      var u = "function" == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }


module.exports = {createPosts, removePreviousPosts};

},{}],2:[function(require,module,exports){
// const { response } = require("../../server/app");
const helpers = require("./helpers");
const apiDomain = "https://my-little-victories.herokuapp.com/"


fetch(`${apiDomain}posts`)
.then(response => response.json())
.then(data => { 
  helpers.createPosts(data)
  bindings()
})
.catch(error => console.log(error));


const formSubmit = document.getElementById("formSubmit");

formSubmit.addEventListener("click", (e) => {
 

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
    helpers.createPosts(obj);
    bindings()
  })
  .catch(error => console.log(error));
})

function addEmojiEvents() {
  const reactionDiv = document.querySelectorAll(".emoji")

  const emojiArray = Array.from(reactionDiv)



emojiArray.forEach(elm => {
  elm.addEventListener("click", (e) => {
    // get the parent container
    const parentArticle = e.target.closest("article");
    const itemId = parentArticle.id
    const classList = e.target.classList
    const reactionType = classList[0]
  
    if (reactionType === 'pContainer') {
        return
    }
  
    let tally = parseInt(e.target.querySelector('p').textContent);
    tally++
    // Update Dom
    e.target.querySelector("p").textContent = tally;
  
    // Update server date
    const data = {target: reactionType}
  
    const options = {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }
    
      fetch(`${apiDomain}posts/reactions/update/${itemId}`, options)
        .then(response => response.text())
        .then()
        .catch(error => console.log(error));
  })
})


}

function buttonEvents() {
  const buttons = document.querySelectorAll('.collapsible')
  const buttonsArr = Array.from(buttons);

  buttonsArr.forEach(button => {
    button.addEventListener("click", function() {
      this.classList.toggle("active");
      var content = button.closest('article').querySelector('.comments')
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });


        function createPosts(data) {
          removePreviousPosts();
          for (let i = data.length - 1; i >= 0; i--) {
            const newArticle = document.createElement("article");

            const post = document.createElement("div");
            post.classList.add("post");
            post.textContent = data[i].message;

            newArticle.append(post);

            const reactions = document.createElement("div");
            reactions.classList.add("reactions");
            const emojiBox = document.createElement("div");
            emojiBox.id = "emoji-box";
            const button = document.createElement("button");
            button.classList.add("collapsible");

            // ADD EMOJI ENTRIES
            const emojiEntries = Object.keys(data[i].reactions);

            emojiEntries.forEach((emojiType) => {
              const reactionDiv = document.createElement("div");
              reactionDiv.classList.add(emojiType);
              reactionDiv.classList.add("emoji");

              const pContainer = document.createElement("div");
              pContainer.classList.add("pContainer");

              const reactionCount = document.createElement("p");
              reactionCount.classList.add(emojiType);
              reactionCount.textContent = data[i].reactions[emojiType];

              pContainer.append(reactionCount);
              reactionDiv.append(pContainer);
              emojiBox.append(reactionDiv);
            });

            reactions.append(emojiBox);
            reactions.append(button);
            newArticle.append(reactions);

            const comments = document.createElement("div");
            comments.classList.add("comments");

            const headline = document.createElement("h4");
            headline.textContent = "Comments";

            const addCommentBtn = document.createElement("button");
            addCommentBtn.classList.add("add");
            addCommentBtn.textContent = "+";

            comments.append(headline);
            comments.append(addCommentBtn);

            if (!!data[i].comments) {
              data[i].comments.forEach((comment) => {
                const currentComment = document.createElement("p");
                currentComment.textContent = comment;
                comments.append(currentComment);
              });
            }

            newArticle.append(comments);

            newArticle.id = data[i].id;

            document.querySelector("main").append(newArticle);
          }
        }

        module.exports = { createPosts, removePreviousPosts };
      },
      {},
    ],
    2: [
      function (require, module, exports) {
        // const { response } = require("../../server/app");
        const helpers = require("./helpers");
        const apiDomain = "http://localhost:3000/";

        fetch(`${apiDomain}posts`)
          .then((response) => response.json())
          .then((data) => {
            helpers.createPosts(data);
            bindings();
          })
          .catch((error) => console.log(error));

        const formSubmit = document.getElementById("formSubmit");
        formSubmit.addEventListener("click", (e) => {
          console.log(e.target);
          console.log();

          const data = {
            message: document.getElementById("newPostText").value,
          };
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          };

          fetch(`${apiDomain}posts/new`, options)
            .then((response) => response.json())
            .then((obj) => {
              console.log(obj);
              helpers.createPosts(obj);
            })
            .catch((error) => console.log(error));
        });

        function addEmojiEvents() {
          const reactionDiv = document.querySelectorAll(".emoji");
          console.log(reactionDiv);
          const emojiArray = Array.from(reactionDiv);
          console.log(emojiArray);
          //   const eventTarget = reactionDiv.querySelectorAll('.emoji')
          // console.log(eventTarget)

          emojiArray.forEach((elm) => {
            elm.addEventListener("click", (e) => {
              // get the parent container
              const parentArticle = e.target.closest("article");
              const itemId = parentArticle.id;
              const classList = e.target.classList;
              const reactionType = classList[0];

              if (reactionType === "pContainer") {
                return;
              }

              let tally = parseInt(e.target.querySelector("p").textContent);
              tally++;
              // Update Dom
              e.target.querySelector("p").textContent = tally;

              // Update server date
              const data = { target: reactionType };

              const options = {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              };

              fetch(`${apiDomain}posts/reactions/update/${itemId}`, options)
                .then((response) => response.text())
                .then()
                .catch((error) => console.log(error));
            });
          });
        }

        function buttonEvents() {
          //TODO get the buttons and add the events

          const buttons = document.querySelectorAll(".collapsible");
          const buttonsArr = Array.from(buttons);
          console.log(buttons);

          buttonsArr.forEach((button) => {
            button.addEventListener("click", function () {
              this.classList.toggle("active");
              var content = button.closest("div");
              if (content.style.display === "block") {
                content.style.display = "none";
              } else {
                content.style.display = "block";
              }
            });
          });
        }

        function bindings() {
          addEmojiEvents();
          buttonEvents();
        }

        //========= THESE ARE WORKING METHODS TO GET THE DATA FROM OUR API

        // //===== Get all data
        // fetch(`${apiDomain}posts`)
        //   .then(response => response.json())
        //   .then(obj => console.log(obj))
        //   .catch(error => console.log(error));

        // //===== Add a Comment
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
      },
      { "./helpers": 1 },
    ],
  },
  {},
  [2]
);
