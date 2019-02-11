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
  });
});
