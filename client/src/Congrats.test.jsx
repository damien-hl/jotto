import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { checkProps, findByTestAttr } from "../test/testUtils";
import Congrats from "./Congrats";

const defaultProps = { success: false };

/**
 * Factory function to create a ShallowWrapper for the Congrats component
 *
 * @function setup
 * @param {object} props Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };

  return shallow(<Congrats {...setupProps} />);
};

test("Renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.length).toBe(1);
});

test("Renders no text when `success` prop is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});

test("Renders non-empty congrats message when `success` is true", () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, "congrats-message");
  expect(message.text().length).not.toBe(0);
});

test("Does not throw a warning with expected props", () => {
  const expectedProps = { success: false };
  checkProps(Congrats, expectedProps);
});
