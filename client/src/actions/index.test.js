import moxios from "moxios";
import { actionTypes, correctGuess, getSecretWord } from "./";

describe("correctGuess", () => {
  test("Returns an action with type `CORRECT_GUESS`", () => {
    const action = correctGuess();
    expect(action).toStrictEqual({ type: actionTypes.CORRECT_GUESS });
  });
});

describe("getSecretWord", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("Secret word is returned", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: "party",
      });
    });

    // Update to test app in Redux / Context section
    return getSecretWord().then((secretWord) => {
      expect(secretWord).toBe("party");
    });
  });
});
