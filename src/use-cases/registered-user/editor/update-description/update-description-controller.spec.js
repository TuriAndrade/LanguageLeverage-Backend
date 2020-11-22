import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { updateDescriptionController } from "./index";
import { notValidatedEditorLogin } from "../../../../../__tests__/fixtures/utils/login";

describe("update description controller test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should update description", async () => {
    const loggedUser = await notValidatedEditorLogin();

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, dicta.",
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await updateDescriptionController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 204,
      })
    );
  });

  it("should return an error response", async () => {
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus, culpa",
      },
    };

    const actualResponse = await updateDescriptionController(request);

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
