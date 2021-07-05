(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function test() {
  return 2 + 2;
}

function testTwo() {
  return 2 + 2;
}

module.exports = { test, testTwo };

},{}],2:[function(require,module,exports){
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
},{"./helpers":1}]},{},[2]);
