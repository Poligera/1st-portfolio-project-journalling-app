const app = require("../server/app");
const request = require("supertest");
const rootData = require("../data.json");


describe("api testing", () => {
    let api;
    let port = 5000;
    beforeAll(() => {
        api = app.listen(port, () => {
            console.log("listening");
        });
    });

    test("we get a response", (done) => {
        request(api).get("/posts").expect(200, done);
    });
    test("we get all posts returned", (done) => {
        request(api).get("/posts").expect([
            {
              "id": 1,
              "message": "hi",
              "reactions": {
                "smile": 0,
                "celebrate": 0,
                "love": 0
              },
              "comments": [
                "Comment 1",
                "Comment 2"
              ]
            }
          ], done);
    });

    test("response is 200", (done) => {
        request(api).get("/posts/comments/1").expect(200, done);
    })
    test("correct comments are returned", (done) => {
        request(api).get("/posts/comments/1").expect(rootData[0].comments, done);
    });
    test("out of index is handled", (done) => {
        request(api).get("/posts/comments/0").expect('item not found', done);
    });
    

    

    afterAll((done) => {
        console.log("Gracefully stopping test server");
        api.close(done);
    });

});