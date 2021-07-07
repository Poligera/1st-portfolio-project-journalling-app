const helpers = require("../client/assets/helpers");
const data = require("../data.json")

describe("header testing", () => {
    beforeAll(() => {
        document.documentElement.innerHTML = `<head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>All My Stations</title><script defer src="./js/bundle.js"></script><link rel="stylesheet" href="style.css" /></head>`;
    });
    
    test("head should be present", () => {
        expect(document.querySelector("head")).toBeTruthy();
    });
});



describe("body testing", () => {
    beforeAll(() => {
        document.documentElement.innerHTML = `<body><main><article><article></main></body>`;
    });
    
    test("add posts should produce the right html structure", () => {
        const data = [{
            "id": 1,
            "message": "I want to be famous",
            "reactions": {"smile": 4, "celebrate": 1, "love": 3},
            "comments": ["this is my post", "I liked it"]
        },]
        helpers.createPosts(data);
        expect(document.querySelector("article")).toBeTruthy();
    });

    test("only adds one item", () => {
        const data = [{
            "id": 1,
            "message": "I want to be famous",
            "reactions": {"smile": 4, "celebrate": 1, "love": 3},
            "comments": ["this is my post", "I liked it"]
        },]
        helpers.createPosts(data);
        expect(document.querySelectorAll("article")).toHaveLength(1)
    });

    test('removes previous elements', () => {
        helpers.removePreviousPosts()
        expect(document.querySelector('article')).toBeFalsy()

    })
});
