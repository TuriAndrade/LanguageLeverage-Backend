import createFakeSubscriber from "../../../../__tests__/fixtures/fakeSubscriber";
import { subscribeToNewsletterController } from "./index";
import truncate from "../../../../__tests__/fixtures/utils/truncate";

describe("subscriber on post controller test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should subscribe to newsletter", async () => {
    const subscriber = createFakeSubscriber();

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        ...subscriber,
      },
    };

    const actualResponse = await subscribeToNewsletterController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          subscriberId: expect.any(Number),
        },
      })
    );
  });

  it("should return error response", async () => {
    const subscriber = createFakeSubscriber({ name: null });

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        ...subscriber,
      },
    };

    const actualResponse = await subscribeToNewsletterController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: expect.any(String),
        },
      })
    );
  });
});
