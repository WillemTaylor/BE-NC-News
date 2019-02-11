process.env.NODE_ENVv = "test";
const { expect } = require("chai");
// const supertest = require("supertest");
// const app = require("../app");
const { topicData, userData, articleData, commentData } = require("../data/");
const {
  dateRef,
  dateRef1,
  createRef,
  formatComments
} = require("../utils/index");

// const request = supertest(app);

describe("topicsTable", () => {
  it("returns an created_at in the correct format (ie. converted from a timestamp to date format", () => {
    expect(dateRef(articleData)[0].created_at).to.equal(
      "2016-08-18T12:07:52.389Z"
    );
  });
  xit("returns an array of keys within the articleData table", () => {
    console.log(articleData[0]);
    expect(articleData[0]).to.contain.keys(
      "title",
      "topic",
      "author",
      "body",
      "created_at",
      "votes"
    );
  });
});
