import buildCreateFakeSubject from "./fakeSubject";

const randomString = require("randomstring");
const randomNumber = require("random");

const createFakeSubject = buildCreateFakeSubject({
  randomString,
  randomNumber,
});

export default createFakeSubject;
