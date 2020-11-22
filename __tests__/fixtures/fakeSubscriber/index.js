import buildCreateFakeSubscriber from "./fakeSubscriber";

const faker = require("faker");

const createFakeSubscriber = buildCreateFakeSubscriber({
  faker,
});

export default createFakeSubscriber;
