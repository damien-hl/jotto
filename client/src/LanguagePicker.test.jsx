import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { checkProps, findByTestAttr } from "../test/testUtils";
import LanguagePicker from "./LanguagePicker";

const mockSetLanguage = jest.fn();

/**
 * Factory function to create a ShallowWrapper for the LanguagePicker component
 *
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => {
  return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
};

test("Renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-language-picker");
  expect(component.length).toBe(1);
});

// eslint-disable-next-line jest/expect-expect
test("Does not throw a warning with expected props", () => {
  checkProps(LanguagePicker, { setLanguage: jest.fn() });
});

test("Renders non-zero language icons", () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, "language-icon");
  expect(languageIcons.length).toBeGreaterThan(0);
});

test("Calls setLanguage prop upon click", () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, "language-icon");

  const firstIcon = languageIcons.first();
  firstIcon.simulate("click");

  expect(mockSetLanguage).toHaveBeenCalled();
});
