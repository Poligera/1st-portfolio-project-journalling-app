// const { response } = require("../../server/app");
const helpers = require("./helpers");

const apiDomain = "https://my-little-victories.herokuapp.com/";

fetch(`${apiDomain}posts`)
  .then((response) => response.json())
  .then((data) => {
    helpers.createPosts(data);
    bindings();
  })
  .catch((error) => console.log(error));

// Add event listener to the POST textArea to notify user how many characters he is entering and of the maximum allowed length:
const newPostText = document.getElementById("newPostText");
const counterPost = document.getElementById("charCounterPost");
newPostText.addEventListener("input", (e) => {
  const target = e.target;
  const maxLength = target.getAttribute("maxlength");
  let currentLength = target.value.length;
  counterPost.textContent = `${maxLength - currentLength} characters remaining`;
});

// Add event listener to the COMMENT textArea to notify user how many characters he is entering and of the maximum allowed length:
const newCommentText = document.getElementById("newCommentText");
const counterComment = document.getElementById("charCounterComment");
newCommentText.addEventListener("input", (e) => {
  const target = e.target;
  const maxLength = target.getAttribute("maxlength");
  let currentLength = target.value.length;
  counterComment.textContent = `${
    maxLength - currentLength
  } characters remaining`;
});

const formSubmit = document.getElementById("formSubmit");

formSubmit.addEventListener("click", (e) => {
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
