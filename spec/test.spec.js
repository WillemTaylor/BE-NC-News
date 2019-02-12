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
  describe.only("/articles", () => {
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
    xit("posts a new article object given object data", () => {
      const newArticle = {
        title: "Making a POST request",
        body:
          "Making a post request is easy once you know how. Check out a tutorial here",
        topic: "coding",
        author: "WillyWehWah"
      };
      return request
        .post("/api/articles")
        .send(newArticle)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.articles[0].title).to.equal("Making a POST request");
          expect(res.body.articles[0].author).to.equal(newArticle.topic);
          expect(res.body.articles[0].topic).to.equal(newArticle.author);
        });
    });
  });
});
