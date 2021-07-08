const helpers = require("../client/assets/helpers")

const data = [{
    "id": 1,
    "message": "I want to be famous",
    "reactions": {"smile": 4, "celebrate": 1, "love": 3},
    "comments": ["this is my post", "I liked it"]
},]
const dataTwo = [{
    "id": 1,
    "message": "I want to be famous",
    "reactions": {"smile": 4, "celebrate": 1, "love": 3},
    "gifUrl": "https://media2.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif?cid=ecf05e470hbr04xnsohhc4jhn3wkdpzs0oqittjukgc912r2&rid=giphy.gif&ct=g"
},]

describe("body testing", () => {
    beforeAll(() => {
        document.documentElement.innerHTML = `<body><main><article><article></main></body>`;
    });
    
    
    test("only adds one item", () => {
        
        helpers.createPosts(data);
        expect(document.querySelectorAll("article")).toHaveLength(1)
    });
    
    test("data with no comments doesn't break", () => {
        
        helpers.createPosts(dataTwo);
        expect(document.querySelectorAll("article")).toHaveLength(1)
    });
});