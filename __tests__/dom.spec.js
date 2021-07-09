const helpers = require("../client/assets/helpers");
const data = require("../data.json")

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../client/index.html'), 'utf8');

describe('head testing', () => {

    //===== use this if you're bring in an entire file =====//

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString()
    })

 
    test('the title has been changed from the default', () => {
        
        let title = document.querySelector('title')
        expect(title.textContent).not.toEqual('Document');
    });

    test('css link is not # (default)', () => {
        let css = document.querySelector('link[rel="stylesheet"]');
        expect(css.getAttribute("href")).not.toEqual('#') 
    });

    test('css links to a file with .css as its extension', () => {
        let css = document.querySelector('link[rel="stylesheet"]');
        let link = css.getAttribute("href");
        let result = /.css$/i.test(link)
        expect(result).toBeTruthy()
    });

    test('the page has a favicon element', () => {
        let iconLink = document.querySelector('link[rel="icon"]');
        expect(iconLink).toBeTruthy()
    });

    test('the favicon link is present', () => {
        let iconLink = document.querySelector('link[rel="icon"]');
        expect(iconLink.getAttribute("href")).not.toEqual('#') 
    });

    test('the favicon is in the correct .ico format', () => {
        let linkElm = document.querySelector('link[rel="icon"]');
        let link = linkElm.getAttribute("href");
        let result = /.ico$/i.test(link)
        expect(result).toBeTruthy()
    });

    test('script tag is present', () => {
        let javascriptLink = document.querySelector('script');
        expect(javascriptLink).toBeTruthy()
    });

    test('script has a src attribute', () => {
        let javascriptLink = document.querySelector('script');
        let src = javascriptLink.getAttribute("src");
        expect(src).toBeTruthy();
    });

    test('script link is a bundle.js', () => {
        let javascriptLink = document.querySelector('script');
        let src = javascriptLink.getAttribute("src");
        expect(src).toBe("assets/bundle.js");
    });
})



describe("body testing", () => {
    beforeAll(() => {
        document.documentElement.innerHTML = `<body><main><article><article></main></body>`;
    });
    
    test("create post should add an article to the dom", () => {
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
