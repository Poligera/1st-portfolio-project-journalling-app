(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const apiDomain = "https://my-little-victories.herokuapp.com/";

function removePreviousPosts() {
  const postList = document.querySelectorAll("article");
  Array.from(postList);
  postList.forEach((element) => {
    element.remove();
  });
}

function createPosts(data) {
  removePreviousPosts();
  for (let i = data.length - 1; i >= 0; i--) {
    const newArticle = document.createElement("article");

    const post = document.createElement("div");
    post.classList.add("post");
    post.textContent = data[i].message;

    newArticle.append(post);

    if (data[i].gifUrl) {
      const gifContainer = document.createElement("div");
      gifContainer.classList.add("postGifContainer");

      const img = document.createElement("img");
      img.classList.add("post-gif");
      img.src = data[i].gifUrl;

      gifContainer.append(img);

      newArticle.append(gifContainer);
    }

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
        currentComment.style.marginTop = "2rem";
        comments.append(currentComment);
      });
    }

    newArticle.append(comments);

    newArticle.id = data[i].id;

    document.querySelector("main").append(newArticle);
  }
}

module.exports = { createPosts, removePreviousPosts };

},{}],2:[function(require,module,exports){
const helpers = require("./helpers");

const apiDomain = "https://my-little-victories.herokuapp.com/";

//========= SELECTORS =========//

const gifSearchButton = document.getElementById("giphySearchButton");
const addGifButton = document.querySelector("#addGif");
const newPostText = document.getElementById("newPostText");
const counterPost = document.getElementById("charCounterPost");
const addPostButton = document.getElementById("formSubmit");


//========= EVENT LISTENERS =========//


// calls the Giphy api and displays the results
gifSearchButton.addEventListener("click", (e) => {
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

// makes the gif search div display
addGifButton.addEventListener("click", (e) => {
  document.getElementById("gifPopup").style.display = "block";
});

// Closes the Giphy search Div when the close button is pressed.
document.getElementById("closeButton").addEventListener("click", () => {
  document.getElementById("gifPopup").style.display = "none";
});

// Calculate remaining characters 
newPostText.addEventListener("input", (e) => {
  const target = e.target;
  const maxLength = target.getAttribute("maxlength");
  let currentLength = target.value.length;
  counterPost.textContent = `${maxLength - currentLength} characters remaining`;

  // Button is enabled since textarea has text:
  addPostButton.disabled = false;
});

addPostButton.addEventListener("click", (e) => {
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

//========= FUNCTIONS =========//


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

function loadAllPosts() {
  fetch(`${apiDomain}posts`)
  .then((response) => response.json())
  .then((data) => {
    helpers.createPosts(data);
    bindings();
  })
  .catch((error) => console.log(error));
}

//========= ON LOAD =========//

loadAllPosts()
},{"./helpers":1}]},{},[2]);
