import buildCreateFakeFile from "./fakeFile";

const randomNumber = require("random");
const randomString = require("randomstring");

const createFakeFile = buildCreateFakeFile({
  randomNumber,
  randomString,
});

export default createFakeFile;
