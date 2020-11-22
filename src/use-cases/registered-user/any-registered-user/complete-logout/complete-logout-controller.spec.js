import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { completeLogoutController } from "./index";
import { userLogin } from "../../../../../__tests__/fixtures/utils/login";
import { getSessions } from "../get-sessions";

describe("logout controller test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should logout", async () => {
    const loggedUser = await userLogin();

    const sessionObjects = await getSessions({
      userToken: loggedUser.decodedToken,
    });

    const sessions = sessionObjects.map((session) => {
      return session.id;
    });

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        password: loggedUser.user.password,
        sessions,
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await completeLogoutController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          thisSessionIncluded: true,
        },
      })
    );
  });

  it("should logout from all sessions but this", async () => {
    const loggedUser = await userLogin();

    const sessionObjects = await getSessions({
      userToken: loggedUser.decodedToken,
    });

    const sessions = sessionObjects.map((session) => {
      if (session.id !== loggedUser.decodedToken.reqInfo.id) {
        return session.id;
      }
    });

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        password: loggedUser.user.password,
        sessions,
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await completeLogoutController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          thisSessionIncluded: false,
        },
      })
    );
  });

  it("should return an error response", async () => {
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        password: "inexistentpassword",
      },
    };

    const actualResponse = await completeLogoutController(request);

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
