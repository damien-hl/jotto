import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import Congrats from "./Congrats";

/**
 * Factory function to create a ShallowWrapper for the Congrats component
 *
 * @function setup
 * @param {{success: boolean, language: string}} testValues Context values specific to this setup
 * @returns {ReactWrapper}
 */
const setup = ({ success, language }) => {
  language = language || "en";
  success = success || false;

  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats />
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

describe("languagePicker", () => {
  test("Correctly renders congrats string english", () => {
    const wrapper = setup({ success: true });
    expect(wrapper.text()).toBe("Congratulations! You guessed the word!");
  });

  test("Correctly renders congrats string emoji", () => {
    const wrapper = setup({ success: true, language: "emoji" });
    expect(wrapper.text()).toBe("🎯🎉");
  });
});

test("Renders without error", () => {
  const wrapper = setup({ success: true });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.length).toBe(1);
});

test("Renders no text when `success` is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});

test("Renders non-empty congrats message when `success` is true", () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, "congrats-message");
  expect(message.text().length).not.toBe(0);
});
