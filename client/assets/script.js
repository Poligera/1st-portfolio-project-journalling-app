// const { response } = require("../../server/app");
const helpers = require("./helpers");
const apiDomain = "http://localhost:3000/"


fetch(`${apiDomain}posts`)
.then(response => response.json())
.then(data => { 
  helpers.createPosts(data)
  bindings()
})
.catch(error => console.log(error));


const formSubmit = document.getElementById("formSubmit");
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

function addEmojiEvents() {
  const reactionDiv = document.querySelectorAll(".emoji")
  console.log(reactionDiv)
  const emojiArray = Array.from(reactionDiv)
  console.log(emojiArray);
//   const eventTarget = reactionDiv.querySelectorAll('.emoji')
// console.log(eventTarget)

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
  //TODO get the buttons and add the events

  const buttons = document.querySelectorAll('.collapsible')
  const buttonsArr = Array.from(buttons);
  console.log(buttons)

  buttonsArr.forEach(button => {
    button.addEventListener("click", function() {
      this.classList.toggle("active");
      console.log(button.closest('div'))
      var content = button.closest('article').querySelector('.comments')
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });

  
}

function bindings() {
  addEmojiEvents()
  buttonEvents()
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




