const helpers = require("../client/js/helpers");

describe("header testing", () => {
    beforeAll(() => {
        document.documentElement.innerHTML = `<head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>All My Stations</title><script defer src="./js/bundle.js"></script><link rel="stylesheet" href="style.css" /></head>`;
    });
    
    test("head should be present", () => {
        expect(document.querySelector("head")).toBeTruthy();
    });
});

describe("random number doesn't return out of index", () => {
    beforeAll(() => {
        document.documentElement.innerHTML = `<button>This is the text</button>`;
    });

    test("the button text changes", () => {
        helpers.changeButtonText("I am new");
        expect(document.querySelector("button").textContent).toBe("I am new");
    });
});

describe("body testing", () => {
    beforeAll(() => {
        document.documentElement.innerHTML = `<main></main>`;
    });
    
    test("add posts should produce the right html structure", () => {
        const data = [{
            "id": 1,
            "message": "I want to be famous",
            "reactions": {"smile": 4, "celebrate": 1, "love": 3},
            "comments": ["this is my post", "I liked it"]
        },]
        helpers.createPosts(data);
        expect(document.querySelector("main")).toEqual(`<div class="post">
        I want to be famous
        </div>
      <div class="reactions">
          <div id="emoji-box"></div>
          <button type="button" class="collapsible"></button>
        </div>
        <div class="comments">
          <h4>COMMENTS</h4>
          <p class="comment-paragraph">this is my post</p>
          <p class="comment-paragraph">I liked it</p>
          <button type="button" class="add">+</button>
        </div>`);
    });
});

