import buildCreateFakeLike from "./fakeLike";

const faker = require("faker");
const randomNumber = require("random");

const createFakeLike = buildCreateFakeLike({
  randomNumber,
  faker,
});

export default createFakeLike;
