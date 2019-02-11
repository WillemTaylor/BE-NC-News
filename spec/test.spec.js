process.env.NODE_ENVv = "test";
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

const request = supertest(app);

describe("articlesTable", () => {
  it("returns a created_at value in the correct format (ie. converted from a timestamp to date format", () => {
    expect(dateRef(articleData)[0].created_at).to.equal(
      "2016-08-18T12:07:52.389Z"
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
describe("topicsTable", () => {
  it("Table returns an array of objects", () => {
    expect(topicData).to.be.an("array");
  });
  it("returns an array of keys within the topicData table", () => {
    expect(topicData[0]).to.contain.keys("description", "slug");
  });
});
describe("usersTable", () => {
  it("Table returns an array of objects", () => {
    expect(userData).to.be.an("array");
  });
  it("returns an array of keys within the userData table", () => {
    expect(userData[0]).to.contain.keys("username", "name", "avatar_url");
  });
});
describe("commentsTable", () => {
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
  });
  it("returns a created_at value in the correct format (ie. converted from a timestamp to date format", () => {
    expect(dateRef1(commentData)[0].created_at).to.equal(
      "2016-07-09T18:07:18.932Z"
    );
  });
});

describe("/api", () => {
  describe("/topics", () => {
    it("serves up an array of topics", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.be.an("array");
          expect(res.body.topics[0]).to.contain.keys("description", "slug");
          expect(res.body.topics).to.have.length(3);
          expect(res.body.topics[0].slug).to.equal("coding");
          expect(res.body.topics[0].description).to.equal(
            "Code is love, code is life"
          );
        });
    });
    xit("posts a new topic object given object data", () => {
      const newTopic = {
        slug: "Willem",
        description: "On course for Northcoders graduation!"
      };
      return request
        .post("/api/topics")
        .send(newTopic)
        .expect(201)
        .then(res => {
          expect(res).to.be.an("object");
          expect(res).to.eql(newTopic);
          expect(res.body.topics).to.have.length(4);
          expect(res.body.topics[3].slug).to.equal("Willem");
          expect(res.body.topics[3].description).to.equal(
            "On course for Northcoders graduation!"
          );
        });
    });
  });

  describe("/articles", () => {
    xit("serves up an array of articles", () => {
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
          expect(res.body.articles).to.have.length(36);
          expect(res.body.articles[0].topic).to.equal("coding");
          expect(res.body.articles[0].title).to.equal("Running a Node App");
          expect(res.body.articles[0].votes).to.equal(0);
          expect(res.body.articles[0].author).to.equal("jessjelly");
        });
    });
    xit("posts a new article object given object data", () => {
      const newArticle = {
        title: "Making a POST request",
        body:
          "Making a post request is easy once you know how. Check out a tutorial here",
        votes: 10,
        topic: "coding",
        author: "WillyWehWah"
      };
      return request
        .post("/api/articles")
        .send(newArticle)
        .expect(201)
        .then(res => {
          expect(res).to.be.an("object");
          expect(res).to.eql(newArticle);
          expect(res.body.articles).to.have.length(37);
          expect(res.body.articles[37].title).to.equal("Making a POST request");
          expect(res.body.articles[3].votes).to.equal(10);
          expect(res.body.articles[3].author).to.equal("WillyWehWah");
          expect(res.body.articles[3].topic).to.equal("coding");
        });
    });
  });
});
