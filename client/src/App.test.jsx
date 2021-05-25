import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
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
  return mount(<App />);
};

describe.each([
  [null, true, false],
  ["party", false, true],
])("renders with secretWord as %s", (secretWord, loadingShows, appShows) => {
  let wrapper;
  let originalUseReducer;

  beforeEach(() => {
    originalUseReducer = React.useReducer;

    const mockUseReducer = jest
      .fn()
      .mockReturnValue([{ secretWord, language: "en" }, jest.fn()]);

    React.useReducer = mockUseReducer;
    wrapper = setup();
  });

  afterEach(() => {
    React.useReducer = originalUseReducer;
  });

  test(`Renders loading spinner: ${loadingShows}`, () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");
    expect(spinnerComponent.exists()).toBe(loadingShows);
  });

  test(`Renders App: ${appShows}`, () => {
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.exists()).toBe(appShows);
  });
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
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    // Using setProps to trigger useEffect
    wrapper.setProps();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});
