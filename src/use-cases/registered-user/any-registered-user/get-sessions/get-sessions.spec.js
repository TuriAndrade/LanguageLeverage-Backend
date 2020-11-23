import { getSessions } from "./index";
import { userLogin } from "../../../../../__tests__/fixtures/utils/login";

require("../../../../config/dotenv");

describe("get sessions", () => {
  it("should get sessions", async () => {
    const loggedUser = await userLogin();

    const sessions = await getSessions({
      userToken: loggedUser.decodedToken,
    });

    sessions.map((session) => {
      expect(session).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          ip: expect.any(String),
          date: expect.any(Number),
          range: expect.any(Array),
          country: expect.any(String),
          region: expect.any(String),
          eu: expect.any(String),
          timezone: expect.any(String),
          city: expect.any(String),
          ll: expect.any(Array),
          metro: expect.any(Number),
          area: expect.any(Number),
          active: expect.any(Boolean),
        })
      );
    });
  });

  it("should throw error for invalid user token", async () => {
    await expect(() => getSessions({ userToken: null })).rejects.toThrowError();
  });
});
