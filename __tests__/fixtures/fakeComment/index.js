import buildCreateFakeComment from "./fakeComment";

const randomString = require("randomstring");
const faker = require("faker");
const randomNumber = require("random");

const createFakeComment = buildCreateFakeComment({
  randomString,
  randomNumber,
  faker,
});

export default createFakeComment;
