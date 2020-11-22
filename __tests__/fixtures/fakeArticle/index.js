import buildCreateFakeArticle from "./fakeArticle";

const randomNumber = require("random");
const randomString = require("randomstring");

const createFakeArticle = buildCreateFakeArticle({
  randomNumber,
  randomString,
});

export default createFakeArticle;
