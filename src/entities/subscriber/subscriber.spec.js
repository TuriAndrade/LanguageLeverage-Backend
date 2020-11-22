import createSubscriber from "./index";
import createFakeSubscriber from "../../../__tests__/fixtures/fakeSubscriber";

describe("Subscriber", () => {
  it("should create subscriber", () => {
    const comment = createFakeSubscriber();

    expect(createSubscriber(comment)).toEqual(
      expect.objectContaining({
        getName: expect.any(Function),
        getEmail: expect.any(Function),
      })
    );
  });

  it("should throw errors for invalid email", () => {
    const undefinedEmail = createFakeSubscriber({ email: undefined });

    expect(() => createSubscriber(undefinedEmail)).toThrowError();
  });
});
