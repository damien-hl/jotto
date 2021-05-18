import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { checkProps, findByTestAttr } from "../test/testUtils";
import TotalGuesses from "./TotalGuesses";

const defaultProps = { guessCount: 0 };

/**
 * Factory function to create a ShallowWrapper for the TotalGuesses component
 *
 * @function setup
 * @param {object} props Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };

  return shallow(<TotalGuesses {...setupProps} />);
};

test("Renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-total-guesses");
  expect(component.length).toBe(1);
});

test("Renders the number of guesses", () => {
  const guessCount = 8;
  const wrapper = setup({ guessCount });
  const component = findByTestAttr(wrapper, "component-total-guesses");
  expect(component.text()).toContain(guessCount.toString());
});

test("Does not throw a warning with expected props", () => {
  const expectedProps = { guessCount: 0 };
  checkProps(TotalGuesses, expectedProps);
});
