process.env.NODE_ENVv = "test";
const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

describe("topicsTable", () => {
  it("returns an object with slug and description values", () => {
    expect();
  });
});
