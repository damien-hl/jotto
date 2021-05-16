import moxios from "moxios";
import { getSecretWord } from "./";

describe("getSecretWord", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("Secret word is returned", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: "party",
      });
    });

    // Update to test app in Redux / Context section
    const secretWord = await getSecretWord();
    expect(secretWord).toBe("party");
  });
});
