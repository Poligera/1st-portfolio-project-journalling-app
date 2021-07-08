// const { response } = require("../../server/app");
const { div } = require("prelude-ls");
const helpers = require("./helpers");

const apiDomain = "https://my-little-victories.herokuapp.com/";

function loadAllPosts() {}

fetch(`${apiDomain}posts`)
  .then((response) => response.json())
  .then((data) => {
    helpers.createPosts(data);
    bindings();
  })
  .catch((error) => console.log(error));

// ADD GIFS

const addGif = document.querySelector("#addGif");

document.getElementById("closeButton").addEventListener("click", () => {
  document.getElementById("gifPopup").style.display = "none";
});

addGif.addEventListener("click", (e) => {
  document.getElementById("gifPopup").style.display = "block";
});

const submitButton = document.getElementById("giphySearchButton");

submitButton.addEventListener("click", (e) => {
  let search = document.getElementById("gifSearch").value;

  //Replace spaces in the search term with a plus so the giphy api can handle multi word entries.

  search = search.replace(/\s/g, "+");

  fetch(`${apiDomain}gifs/${search}`)
    .then((response) => response.json())
    .then((obj) => {
      const gifDisplay = document.getElementById("gifs");

      for (let i = 0; i < obj.length; i++) {
        // Create an image and set its source to the current image
        const tempImg = document.createElement("img");
        tempImg.classList.add("gif-img");
        tempImg.src = obj[i].images.original.url;

        // Add an event listener to each photo
        tempImg.addEventListener("click", (e) => {
          // store the source of the clicked image
          const imgSource = e.target.src;

          // close the popup
          document.getElementById("gifPopup").style.display = "none";

          // Add it to the dom
          const gif = document.createElement("img");
          gif.src = imgSource;
          gif.id = "gifToAdd";

          document.querySelector("form").append(gif);
        });
        gifDisplay.append(tempImg);
      }
    })
    .catch((error) => console.log(error));
});

// Add event listener to the POST textArea to notify user how many characters he is entering and of the maximum allowed length:
const newPostText = document.getElementById("newPostText");
const counterPost = document.getElementById("charCounterPost");

// Saving the post button and disabling it until textarea has text in it:
const formSubmit = document.getElementById("formSubmit");
formSubmit.disabled = true;

newPostText.addEventListener("input", (e) => {
  const target = e.target;
  const maxLength = target.getAttribute("maxlength");
  let currentLength = target.value.length;
  counterPost.textContent = `${maxLength - currentLength} characters remaining`;

  // Button is enabled since textarea has text:
  formSubmit.disabled = false;
});

formSubmit.addEventListener("click", (e) => {
  const data = {
    message: document.getElementById("newPostText").value,
  };

  // if the text area is empty then return and don't post anything.
  if (data.message === "") {
    return
  }

  // if it has a gif add it to the object
  if (document.getElementById("gifToAdd") === null) {
    data.gifUrl = null;
  } else {
    data.gifUrl = document.getElementById("gifToAdd").src;
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

      newPostText.value = "";
      if (document.getElementById("gifToAdd")) {
        document.getElementById("gifToAdd").remove();
      }
      

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
}

function buttonEvents() {
  const buttons = document.querySelectorAll(".collapsible");
  const buttonsArr = Array.from(buttons);

  buttonsArr.forEach((button) => {
    button.addEventListener("click", function () {
      // this.classList.toggle("active");
      var content = button.closest("article").querySelector(".comments");
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });

  const addCommentsBtns = document.querySelectorAll(".add");
  const addCommentsBtnsArr = Array.from(addCommentsBtns);
  addCommentsBtnsArr.forEach((button) =>
    button.addEventListener("click", () => {
      // this.classList.toggle("active");
      const modal = document.createElement("div");
      modal.classList.add = "modal";

      const charCounterComment = document.createElement("div");
      charCounterComment.textContent = "280 characters remaining";
      charCounterComment.id = "charCounterComment";
      modal.appendChild(charCounterComment);

      const formComment = document.createElement("form");
      formComment.setAttribute("action", "submit");
      modal.appendChild(formComment);

      const commentTextarea = document.createElement("textarea");
      commentTextarea.setAttribute("maxlength", "280");
      commentTextarea.setAttribute("type", "text");
      commentTextarea.id = "newCommentText";
      formComment.appendChild(commentTextarea);

      const btnSubmitComment = document.createElement("button");
      btnSubmitComment.classList.add = "add-button";
      btnSubmitComment.classList.add = "post-comment";
      btnSubmitComment.id = "form";
      btnSubmitComment.setAttribute("type", "submit");
      btnSubmitComment.id = "form";
      btnSubmitComment.textContent = "ADD COMMENT";
      modal.appendChild(btnSubmitComment);

      button.closest("div").append(modal);
      button.disabled = true;

      // Enable character count above the Textarea:
      commentTextarea.addEventListener("input", (e) => {
        const target = e.target;
        const maxLength = target.getAttribute("maxlength");
        let currentLength = target.value.length;
        charCounterComment.textContent = `${
          maxLength - currentLength
        } characters remaining`;
      });

      // Store the value of user's comment in a variable:
      btnSubmitComment.addEventListener("click", (e) => {
        const commentText = commentTextarea.value;
        postComment(e.target.closest("article").id, commentText);
        // console.log(e.target.closest("article").id);
        // Remove the modal:
        button.closest("div").removeChild(modal);

        // Add new p tag (append to grey box):
        const commentParagraph = document.createElement("p");
        commentParagraph.style.marginTop = "1rem";

        // For testing: add the comment to the existing comments:
        commentParagraph.textContent = commentText;
        button.closest("div").appendChild(commentParagraph);

        // Enable the button:
        button.disabled = false;
      });
    })
  );
}

function postComment(target, comment) {
  // Fetch (with Dan) - POST:
  const data = {
    comment: comment,
  };

  // if the comment is empty return
  if (data.comment === "") {
    return
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(`${apiDomain}posts/comments/new/${target}`, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
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
