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


