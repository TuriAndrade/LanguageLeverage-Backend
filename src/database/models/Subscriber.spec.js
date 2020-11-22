import createSubscriber from "../../entities/subscriber";
import createFakeSubscriber from "../../../__tests__/fixtures/fakeSubscriber";
import truncate from "../../../__tests__/fixtures/utils/truncate";
import { Subscriber } from "./index";

describe("Subscriber database", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should create subscriber", async () => {
    const subscriber = createSubscriber(createFakeSubscriber());

    const createdSubscriber = await Subscriber.create({
      name: subscriber.getName(),
      email: subscriber.getEmail(),
    });

    expect(createdSubscriber).toBeInstanceOf(Subscriber);
  });

  it("should update subscriber", async () => {
    const subscriber = createSubscriber(createFakeSubscriber());

    const createdSubscriber = await Subscriber.create({
      name: subscriber.getName(),
      email: subscriber.getEmail(),
    });

    const update = createSubscriber(createFakeSubscriber());

    const [
      numberOfUpdatedSubscribers,
      updatedSubscribers,
    ] = await Subscriber.update(
      {
        email: update.getEmail(),
      },
      {
        where: {
          id: createdSubscriber.id,
        },
        individualHooks: true,
      }
    );

    expect(numberOfUpdatedSubscribers).toBe(1);
    expect(updatedSubscribers[0].email).toBe(update.getEmail());
  });

  it("should delete subscriber", async () => {
    const subscriber = createSubscriber(createFakeSubscriber());

    const createdSubscriber = await Subscriber.create({
      name: subscriber.getName(),
      email: subscriber.getEmail(),
    });

    const numberOfDestroyedSubscribers = await Subscriber.destroy({
      where: {
        id: createdSubscriber.id,
      },
    });

    expect(numberOfDestroyedSubscribers).toBe(1);
  });

  it("should find subscribers by id", async () => {
    const subscriber = createSubscriber(createFakeSubscriber());

    const createdSubscriber = await Subscriber.create({
      name: subscriber.getName(),
      email: subscriber.getEmail(),
    });

    const findOne = await Subscriber.findOne({
      where: {
        id: createdSubscriber.id,
      },
    });

    expect(findOne).toBeInstanceOf(Subscriber);
  });

  it("should find all subscribers", async () => {
    const subscribers = [];

    for (let i = 0; i < 10; i++) {
      subscribers.push(createSubscriber(createFakeSubscriber()));
    }

    await Promise.all(
      subscribers.map((subscriber) => {
        return Subscriber.create({
          name: subscriber.getName(),
          email: subscriber.getEmail(),
        });
      })
    );

    const findAll = await Subscriber.findAll();

    findAll.map((subscriber) => expect(subscriber).toBeInstanceOf(Subscriber));
  });
});
