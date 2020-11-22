import buildCreateFakeAdmin from "./fakeAdmin";

const randomNumber = require("random");
const randomString = require("randomstring");
const faker = require("faker");

const createFakeAdmin = buildCreateFakeAdmin({
  randomNumber,
  randomString,
  faker,
});

export default createFakeAdmin;
