import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { checkProps, findByTestAttr } from "../test/testUtils";
import NewWordButton from "./NewWordButton";

const defaultProps = { display: false };

/**
 * Factory function to create a ShallowWrapper for the NewWordButton component
 *
 * @function setup
 * @param {object} props Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<NewWordButton {...setupProps} />);
};

describe("Render", () => {
  test("Renders without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-new-word-button");
    expect(component.length).toBe(1);
  });

  test("Renders no text when `display` prop is false", () => {
    const wrapper = setup({ display: false });
    const component = findByTestAttr(wrapper, "component-new-word-button");
    expect(component.text()).toBe("");
  });

  test("Renders non-empty text when `display` prop is true", () => {
    const wrapper = setup({ display: true });
    const component = findByTestAttr(wrapper, "component-new-word-button");
    expect(component.text().length).not.toBe(0);
  });
});

test("Does not throw a warning with expected props", () => {
  const expectedProps = { display: false, resetAction: () => {} };
  checkProps(NewWordButton, expectedProps);
});

test("Calls `resetAction` prop upon click", () => {
  const resetActionMock = jest.fn();
  const wrapper = setup({ display: true, resetAction: resetActionMock });
  const resetButton = findByTestAttr(wrapper, "component-new-word-button");
  resetButton.simulate("click");
  expect(resetActionMock.mock.calls.length).toBe(1);
});
