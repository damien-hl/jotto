import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";

/**
 * Factory function to create a ShallowWrapper with specified initial conditions,
 * then submit a guessed word of 'train'
 *
 * @function setup
 * @returns {ReactWrapper}
 */
const setup = () => {
  // TODO: Apply state state = {}
  const wrapper = mount(<App />);

  // Add value to input box
  const inputBox = findByTestAttr(wrapper, "input-box");
  inputBox.simulate("change", { target: { value: "train" } });

  // Simulate click on submit button
  const submitButton = findByTestAttr(wrapper, "submit-button");
  submitButton.simulate("click", { preventDefault() {} });

  return wrapper;
};

describe.skip("No words guessed", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({
      guessedWords: [],
      secretWord: "party",
      success: false,
    });
  });

  test("Creates GuessedWords table with one row", () => {
    const guessedWordsRows = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordsRows).toHaveLength(1);
  });
});

describe.skip("Some words guessed", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({
      guessedWords: [{ guessedWord: "agile", letterCountMatch: 1 }],
      secretWord: "party",
      success: false,
    });
  });

  test("Adds rows to guessedWords table", () => {
    const guessedWordsRows = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordsRows).toHaveLength(2);
  });
});

describe.skip("Guess the secret word", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({
      guessedWords: [{ guessedWord: "agile", letterCountMatch: 1 }],
      secretWord: "party",
      success: false,
    });

    const inputBox = findByTestAttr(wrapper, "input-box");
    inputBox.simulate("change", { target: { value: "party" } });

    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click", { preventDefault() {} });
  });

  test("Adds row to guessedWords table", () => {
    const guessedWordsRows = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordsRows).toHaveLength(3);
  });

  test("Displays congrats component", () => {
    const congrats = findByTestAttr(wrapper, "component-congrats");
    expect(congrats.text().length).toBeGreaterThan(0);
  });

  test("Does not display input component contents", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");
    expect(inputBox.exists()).toBe(false);

    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.exists()).toBe(false);
  });
});
