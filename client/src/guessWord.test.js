import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";
// import App from "./App";
import Congrats from "./Congrats";
import Input from "./Input";
import GuessedWords from "./GuessedWords";

/**
 * Factory function to create a ShallowWrapper with specified initial conditions,
 * then submit a guessed word of 'train'
 *
 * @function setup
 * @param {{secretWord: string, guessedWords: Array}} state Initial conditions
 * @returns {ReactWrapper}
 */
const setup = ({ secretWord, guessedWords }) => {
  const wrapper = mount(
    <guessedWordsContext.GuessedWordsProvider>
      <successContext.SuccessProvider>
        <Congrats />
        <Input secretWord={secretWord} />
        <GuessedWords />
      </successContext.SuccessProvider>
    </guessedWordsContext.GuessedWordsProvider>
  );

  // Add value to input box
  const inputBox = findByTestAttr(wrapper, "input-box");
  inputBox.simulate("change", { target: { value: "train" } });

  // Simulate click on submit button
  const submitButton = findByTestAttr(wrapper, "submit-button");
  submitButton.simulate("click", { preventDefault() {} });

  guessedWords.map((guess) => {
    const mockEvent = { target: { value: guess.guessedWord } };
    inputBox.simulate("change", mockEvent);
    submitButton.simulate("click", { preventDefault() {} });
  });

  return wrapper;
};

describe("No words guessed", () => {
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

describe("Some words guessed", () => {
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

describe("Guess the secret word", () => {
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
