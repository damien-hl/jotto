import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Provider } from "react-redux";
import { findByTestAttr, storeFactory } from "../test/testUtils";
import App from "./App";

// Activate global mock to make sure getSecretWord doesn't make network call
jest.mock("./actions");
import { getSecretWord as mockGetSecretWord } from "./actions";

/**
 * Factory function to create a ShallowWrapper for the Congrats component
 *
 * @function setup
 * @returns {ReactWrapper}
 */
const setup = () => {
  const store = storeFactory();

  return mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

test("renders without error", () => {
  const wrapper = setup();
  const app = findByTestAttr(wrapper, "component-app");
  expect(app.length).toBe(1);
});

describe("Get secret word", () => {
  beforeEach(() => {
    mockGetSecretWord.mockClear();
  });

  test("Secret word is retrieved on app mount", () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = setup();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });

  test("getSecretWord does not run on app update", () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    // Using setProps to trigger useEffect
    wrapper.setProps();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});
