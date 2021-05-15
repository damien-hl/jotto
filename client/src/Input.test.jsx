import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import Input from "./Input";

/**
 * Factory function to create a ShallowWrapper for the Congrats component
 *
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => {
  return shallow(<Input />);
};

test("Renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-input");
  expect(component.length).toBe(1);
});
