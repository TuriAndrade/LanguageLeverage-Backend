import buildCreateFakeUser from "./fakeUser";

const randomString = require("randomstring");
const faker = require("faker");

const createFakeUser = buildCreateFakeUser({ randomString, faker });

export default createFakeUser;
