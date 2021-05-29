import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import guessedWordsContext from "./contexts/guessedWordsContext";
import GuessedWords from "./GuessedWords";

/**
 * Factory function to create a ShallowWrapper for the Congrats component
 *
 * @function setup
 * @param {Array} guessedWords Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (guessedWords = []) => {
  const mockUseGuessedWords = jest
    .fn()
    .mockReturnValue([guessedWords, jest.fn()]);
  guessedWordsContext.useGuessedWords = mockUseGuessedWords;

  return shallow(<GuessedWords />);
};

describe("If there are no words guessed", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup([]);
  });

  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });

  test("renders instructions to guess a word", () => {
    const instructions = findByTestAttr(wrapper, "guess-instructions");
    expect(instructions.text().length).not.toBe(0);
  });
});

describe("If there are words guessed", () => {
  let wrapper;

  const guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 },
    { guessedWord: "party", letterMatchCount: 5 },
  ];

  beforeEach(() => {
    wrapper = setup(guessedWords);
  });

  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });

  test("renders `guessed words` section", () => {
    const guessedWordsNode = findByTestAttr(wrapper, "guessed-words");
    expect(guessedWordsNode.length).toBe(1);
  });

  test("correct numbers of guessed words", () => {
    const guessedWordsNode = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordsNode.length).toBe(guessedWords.length);
  });
});

describe("languagePicker", () => {
  test("Correctly renders guess instructions string in english by default", () => {
    const wrapper = setup([]);
    const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
    expect(guessInstructions.text()).toBe("Try to guess the secret word!");
  });

  test("Correctly renders guess instructions string in emoji", () => {
    const mockUseContext = jest.fn().mockReturnValue("emoji");
    React.useContext = mockUseContext;

    const wrapper = setup([]);
    const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
    expect(guessInstructions.text()).toBe("🤔🤫🔤");
  });
});
