const app = require("../server/app");
const request = require("supertest");
const rootData = require("../data.json");


describe("get request tests", () => {
    let api;
    let port = 5000;
    beforeAll(() => {
        api = app.listen(port, () => {
            console.log("listening");
        });
    });

    //Posts
    test("we get a response", (done) => {
        request(api).get("/posts").expect(200, done);
    });
    test("we get all posts returned", (done) => {
        request(api).get("/posts").expect(rootData, done);
    });

    //Comments
    test("response is 200", (done) => {
        request(api).get("/posts/comments/1").expect(200, done);
    })
    test("correct comments are returned", (done) => {
        request(api).get("/posts/comments/1").expect(rootData[0].comments, done);
    });
    test("out of index comment is handled", (done) => {
        request(api).get("/posts/comments/0").expect('item not found', done);
    });

    test("Giphy route responds", (done) => {
        request(api).get("/gifs/test").expect(200, done);
    });

    
    afterAll((done) => {
        console.log("Gracefully stopping test server");
        api.close(done);
    });
});

describe("Post request tests", () => {
    let api;
    let port = 5000;
    beforeAll(() => {
        api = app.listen(port, () => {
            console.log("listening");
        });
    });


    test('it responds to post /posts/new with status 201', done => {
        let testData = { "message": "test" } // Create some data to pass
        request(api)
            .post('/posts/new')
            .send(testData) 
            .expect(201, done)
            
    })
   
    
    test('it responds to post /posts/comments/new/1 with status 201', done => {
        let testData = { "comment": "test" } 

        request(api)
            .post('/posts/comments/new/1')
            .send(testData)
            .expect(201, done)
            
    })

    test('it responds to post /posts/comments/new/1 with status 404', done => {
        let testData = { "comment": "test" } 

        request(api)
            .post('/posts/comments/new/100')
            .send(testData)
            .expect(404, done)
            
    })

    test('it responds to post /posts/reactions/update/1 with status 200', done => {
        let testData = { "target": "smile" }

        request(api)
            .put('/posts/reactions/update/1')
            .send(testData) 
            .expect(200, done)
            
    })

    test('it responds to post /posts/reactions/update/1 with updated', done => {
        let testData = { "target": "smile" }
        
        request(api)
            .put('/posts/reactions/update/1')
            .send(testData) 
            .expect('updated', done)
            
    })

  

   

    afterAll((done) => {
        console.log("Gracefully stopping test server");
        api.close(done);
    });
})