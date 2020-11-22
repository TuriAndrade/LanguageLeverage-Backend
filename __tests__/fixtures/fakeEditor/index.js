import buildCreateFakeEditor from "./fakeEditor";

const randomNumber = require("random");
const randomString = require("randomstring");
const faker = require("faker");

const createFakeEditor = buildCreateFakeEditor({
  randomNumber,
  randomString,
  faker,
});

export default createFakeEditor;
