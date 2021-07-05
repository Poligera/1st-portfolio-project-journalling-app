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
        request(api).get("/trains").expect(200, done);
    });

    test("we get a response", (done) => {
        request(api).get("/trains").expect(rootData, done);
    });

    test("index route returns status code 200" ,(done) => {
        const randomIndex = Math.floor(Math.random() * rootData.length);
        request(api).get(`/trains/${randomIndex}`).expect(200, done)
    })

    test("we get the right data back (randomised)", (done) => {
        const randomIndex = Math.floor(Math.random() * rootData.length);
        request(api).get(`/trains/${randomIndex}`).expect(rootData[randomIndex], done);
    });

    test("out of index gets 404", (done) => {
        request(api).get("/trains/400").expect(404);
        request(api).get("/trains/40").expect("Request is out of index", done);
    });

    afterAll((done) => {
        console.log("Gracefully stopping test server");
        api.close(done);
    });

});