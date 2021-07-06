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





