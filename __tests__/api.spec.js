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
        request(api).get("/posts").expect(rootData, done);
    });

    test("response is 200", (done) => {
        request(api).get("/posts/comments/1").expect(200, done);
    })
    test("correct comments are returned", (done) => {
        request(api).get("/posts/comments/1").expect(rootData[0].comments, done);
    });
    test("out of index comment is handled", (done) => {
        request(api).get("/posts/comments/0").expect('item not found', done);
    });
    
    test('it responds to post /posts/new with status 201', done => {
        let testData = { "message": "test" } // Create some data to pass
        request(api)
            .post('/posts/new') // start a post request via supertest
            .send(testData) // send the testCat data as the request body 
            .expect(201, done) // assert that the response status will be 201
            
    })
   
    
    test('it responds to post /posts/comments/new/1 with status 201', done => {
        let testData = { "comment": "test" } // Create some data to pass
        request(api)
            .post('/posts/comments/new/1') // start a post request via supertest
            .send(testData) // send the testCat data as the request body 
            .expect(201, done) // assert that the response status will be 201
            
    })

    test('it responds to post /posts/reactions/update/1 with status 200', done => {
        let testData = { "target": "smile" } // Create some data to pass
        request(api)
            .put('/posts/reactions/update/1') // start a post request via supertest
            .send(testData) // send the testCat data as the request body 
            .expect(200, done) // assert that the response status will be 201
            
    })

    afterAll((done) => {
        console.log("Gracefully stopping test server");
        api.close(done);
    });



});