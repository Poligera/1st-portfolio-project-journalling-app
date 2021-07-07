// const { response } = require("../../server/app");
const helpers = require("./helpers");
const key = require("./giphy")
const apiDomain = "http://localhost:3000/"


const apiDomain = "https://my-little-victories.herokuapp.com/";

fetch(`${apiDomain}posts`)
.then(response => response.json())
.then(data => { 
  helpers.createPosts(data)
  bindings()
})
.catch(error => console.log(error));

const addGif = document.querySelector("#addGif");



addGif.addEventListener('click', (e) => {

  document.getElementById("gifPopup").style.display = "block"
  
  
})

const submitButton = document.getElementById('giphySearchButton');

submitButton.addEventListener("click", (e) => {

  const search = document.getElementById("gifSearch").value
  
  fetch(`https://api.giphy.com/v1/gifs/search?&api_key=${key}&q=${search}&limit=20`)
  .then(response => response.json())
  .then(obj => {
    console.log(obj.data[10].url)
  })
  .catch(error => console.log(error));
})

const formSubmit = document.getElementById("formSubmit");

formSubmit.addEventListener("click", (e) => {
const data = {
  message: document.getElementById("newPostText").value
}
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
      helpers.createPosts(obj);
      bindings();
    })
    .catch((error) => console.log(error));
});

function addEmojiEvents() {
  const reactionDiv = document.querySelectorAll(".emoji");

  const emojiArray = Array.from(reactionDiv);

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
}

function buttonEvents() {
  // ALL COLLAPSIBLE BUTTONS THAT DISPLAY COMMENTS UNDER EACH POST IF PRESSED:
  const buttons = document.querySelectorAll(".collapsible");
  const buttonsArr = Array.from(buttons);

  buttonsArr.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("active");

      var content = button.closest("article").querySelector(".comments");

      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });

  // ALL ADD-COMMENT-BUTTONS THAT DISPLAY A POPUP MODAL WINDOW:
  const addCommentsButtons = document.querySelectorAll(".add-comment-button");
  const addCommentsBtnArr = Array.from(addCommentsButtons);

  addCommentsBtnArr.forEach((button) => {
    button.addEventListener("click", () => {
      this.classList.toggle("active");
      const modalPostComment = document.querySelector(".modal");
      modalPostComment.style.display === "block"
        ? (modalPostComment.style.display = "none")
        : (modalPostComment.style.display = "block");
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
