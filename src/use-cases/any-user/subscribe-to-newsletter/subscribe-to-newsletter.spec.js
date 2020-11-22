import createFakeSubscriber from "../../../../__tests__/fixtures/fakeSubscriber";
import { subscribeToNewsletter } from "./index";
import truncate from "../../../../__tests__/fixtures/utils/truncate";

describe("subscribe to newsletter test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should subscribe to newsletter", async () => {
    const subscriber = createFakeSubscriber();

    await expect(subscribeToNewsletter(subscriber)).resolves.toEqual(
      expect.objectContaining({
        subscriberId: expect.any(Number),
      })
    );
  });

  it("should throw errors", async () => {
    const subscriber = createFakeSubscriber();

    await subscribeToNewsletter(subscriber);

    await expect(subscribeToNewsletter(subscriber)).rejects.toThrowError();

    const subscriberWithoutName = createFakeSubscriber({ name: null });

    await expect(
      subscribeToNewsletter(subscriberWithoutName)
    ).rejects.toThrowError();
  });
});
