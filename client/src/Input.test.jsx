import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { checkProps, findByTestAttr } from "../test/testUtils";
import Input from "./Input";

// const mockSetCurrentGuess = jest.fn();

// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useState: (initialState) => [initialState, mockSetCurrentGuess],
// }));

/**
 * Factory function to create a ShallowWrapper for the Congrats component
 *
 * @function setup
 * @param {boolean} success Component props specific to this setup
 * @param {string} secretWord Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (success = false, secretWord = "party") => {
  return shallow(<Input success={success} secretWord={secretWord} />);
};

describe("Render", () => {
  describe("Success if true", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup(true);
    });

    test("Renders without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });

    test("Input box does not show", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.exists()).toBe(false);
    });

    test("Submit button does not show", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.exists()).toBe(false);
    });
  });

  describe("Success if false", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup(false);
    });

    test("Renders without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });

    test("Input box shows", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.exists()).toBe(true);
    });

    test("Submit button shows", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.exists()).toBe(true);
    });
  });
});

test("Does not throw a warning with expected props", () => {
  checkProps(Input, { secretWord: "party" });
});

describe("State controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  let originalUseState;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    originalUseState = React.useState;
    React.useState = () => ["", mockSetCurrentGuess];

    wrapper = setup();
  });

  afterEach(() => {
    React.useState = originalUseState;
  });

  test("State updates with value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });

  test("Clear current guess when submit button is clicked", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");

    submitButton.simulate("click", { preventDefault() {} });

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
