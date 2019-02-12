process.env.NODE_ENV = "test";
const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../app");
const { topicData, userData, articleData, commentData } = require("../db/data");
const {
  dateRef,
  dateRef1,
  createRef,
  formatComments
} = require("../db/utils/index");
const connection = require("../db/connection");
const request = supertest(app);

describe("/api", () => {
  beforeEach(() => connection.seed.run());

  after(() => connection.destroy());

  describe("Tables", () => {
    it("returns a created_at value in the correct format (ie. converted from a timestamp to date format", () => {
      expect(dateRef(articleData)[0].created_at).to.equal(
        "2018-11-15T12:21:54.171Z"
      );
    });
    it("returns an array of keys within the articleData table", () => {
      expect(articleData[0]).to.contain.keys(
        "title",
        "topic",
        "author",
        "body",
        "created_at"
      );
    });
  });
  it("Table returns an array of objects", () => {
    expect(topicData).to.be.an("array");
  });
  it("returns an array of keys within the topicData table", () => {
    expect(topicData[0]).to.contain.keys("description", "slug");
  });
  it("Table returns an array of objects", () => {
    expect(userData).to.be.an("array");
  });
  it("returns an array of keys within the userData table", () => {
    expect(userData[0]).to.contain.keys("username", "name", "avatar_url");
  });
  it("Table returns an array of objects", () => {
    expect(commentData).to.be.an("array");
  });
  it("returns an array of keys within the commentData table", () => {
    expect(commentData[0]).to.contain.keys(
      "body",
      "belongs_to",
      "created_by",
      "votes",
      "created_at"
    );
    it("returns a created_at value in the correct format (ie. converted from a timestamp to date format", () => {
      expect(dateRef1(commentData)[0].created_at).to.equal(
        "2016-07-09T18:07:18.932Z"
      );
    });
  });
  describe("/topics", () => {
    it("GET gives 200 status and serves up an array of topic objects", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.be.an("array");
          expect(res.body.topics[0]).to.contain.keys("description", "slug");
          expect(res.body.topics[0].slug).to.equal("mitch");
          expect(res.body.topics[0].description).to.equal(
            "The man, the Mitch, the legend"
          );
        });
    });
    it("posts a new topic object given object data", () => {
      const newTopic = {
        slug: "Willem",
        description: "On course for Northcoders graduation!"
      };
      return request
        .post("/api/topics")
        .send(newTopic)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.topics[0]).to.eql(newTopic);
          expect(res.body.topics[0].slug).to.equal("Willem");
          expect(res.body.topics[0].description).to.equal(
            "On course for Northcoders graduation!"
          );
        });
    });
  });
  describe("/articles", () => {
    it("GET gives status 200 and serves up an array of articles", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles[0]).to.contain.keys(
            "author",
            "title",
            "article_id",
            "topic",
            "created_at",
            "votes"
          );
          expect(res.body.articles[0].topic).to.equal("mitch");
          expect(res.body.articles[0].title).to.equal("Student SUES Mitch!");
          expect(res.body.articles[0].votes).to.equal(0);
          expect(res.body.articles[0].author).to.equal("rogersop");
          expect(+res.body.articles[0].comment_count).to.be.a("Number");
        });
    });
    it("POST 201 and a new article object given object data", () => {
      const newArticle = {
        title: "Making a POST request",
        body:
          "Making a post request is easy once you know how. Check out a tutorial here"
      };
      return request
        .post("/api/articles")
        .send(newArticle)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.articles[0].title).to.equal("Making a POST request");
          expect(res.body.articles[0].author).to.equal(null);
          expect(res.body.articles[0].topic).to.equal(null);
        });
    });
    it("GET gives a status 200 and returns an article object given an id number in it's parameter", () => {
      return request
        .get("/api/articles/1")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("articles");
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles[0].title).to.equal(
            "Living in the shadow of a great man"
          );
          expect(res.body.articles[0].topic).to.equal("mitch");
        });
    });
    xit("PATCH gives a status 200 and returns an article object with an upvoted votes given an article parameter", () => {
      const newVote = { inc_votes: 1 };
      const expected = {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "1542284514171",
        votes: 1
      };
      return request
        .put("/api/articles/1")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("article");
          expect(+res.body.expected.votes).to.eql(101);
        });
    });
    it("DELETE gives a status 204 and deletes the given article by article_id", () => {
      return request
        .delete("/api/articles/4")
        .expect(204)
        .then(res => {
          expect(res.status).to.equal(204);
          expect(res.body).to.eql({});
        });
    });
  });
  describe.only("/users", () => {
    it("GET returns 200 and returns an array of users", () => {
      return request
        .get("/api/users")
        .expect(200)
        .then(res => {
          expect(res.body.users).to.be.an("array");
          expect(res.body.users[0]).to.contain.keys(
            "username",
            "name",
            "avatar_url"
          );
          expect(res.body.users[0].username).to.equal("butter_bridge");
          expect(res.body.users[0].name).to.equal("jonny");
          expect(res.body.users[0].avatar_url).to.equal(
            "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
          );
        });
    });
    it("POST 201 and a new user object given object data", () => {
      const newUser = {
        username: "WillyWehWah",
        name: "Willem Taylor",
        avatar_url: "https://willemtaylor.com"
      };
      return request
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.users[0]).to.eql(newUser);
          expect(res.body.users[0].username).to.equal("WillyWehWah");
          expect(res.body.users[0].name).to.equal("Willem Taylor");
        });
    });
    xit("GET gives a status 200 and returns a user object given an id number in it's parameter", () => {
      return request
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("users");
          expect(res.body.users).to.be.an("array");
          expect(res.body.users[0].username).to.equal("butter_bridge");
          expect(res.body.users[0].name).to.equal("jonny");
          expect(res.body.users[0].avatar_url).to.equal(
            "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
          );
        });
    });
  });
});
