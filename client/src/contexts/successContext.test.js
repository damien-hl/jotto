import React from "react";
import { mount, shallow } from "enzyme";

import successContext from "./successContext";

// Functional component that calls useSuccess for our tests
const FunctionalComponent = () => {
  successContext.useSucess();
  return <div />;
};

test("useSuccess throws error when not wrapped in SuccessProvider", () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow("useSuccess must be used within a SuccessProvider");
});

test("useSuccess does not throws error when wrapped in SuccessProvider", () => {
  expect(() => {
    mount(
      <successContext.SuccessProvider>
        <FunctionalComponent />
      </successContext.SuccessProvider>
    );
  }).not.toThrow();
});
