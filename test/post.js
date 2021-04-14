let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe("Ping API", () => {
  //TEST GET for PING route
  describe("GET /api/ping", () => {
    it("It should return success true and status 200", (done) => {
      chai
        .request(server)
        .get("/api/ping")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
  });
});

describe("Posts API", () => {
  // Test GET route with one tag
  describe("GET /api/posts?tags=tech", () => {
    it("It should GET all posts with tag=tech", (done) => {
      chai
        .request(server)
        .get("/api/posts?tags=tech")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(28);
          done();
        });
    });

    // Test GET route with no tag

    // Test GET with multiple tags. Duplicate items should be removed

    // Test GET with multiple tags, one of which is a random tag such as "sdfdsfdf"

    // Test GET with tags and no sortB and direction parameter

    // Test GET with tags with sortBy and no direction parameter

    // Test GET with tags with sortBy and desc direction parameter

    // Test GET with tags with sortBy and asc direction parameter

    // Test GET with tags with no sortBy and asc direction parameter

    // Test GET with tags with no sortBy and desc direction parameter

    // Test GET with tags with random sortBy parameter such as "efedfdf" and no direction paramter

    // Test GET with tags with no sortBy parameter and a random direction paramter such as "dfdfsfd"

    // Test GET with tags and random sortBy and direction parameters such as "spfosiaf" "243412"

    // Test GET with tags and sortBy and direction parameters with empty string
  });
});
