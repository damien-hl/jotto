import successReducer from "./successReducer";
import { actionTypes } from "../actions";

test("When previous state is undefined, return false", () => {
  const newState = successReducer(undefined, {});
  expect(newState).toBe(false);
});

test("Return previous state when unknown action type", () => {
  const newState = successReducer(false, { type: "unknown" });
  expect(newState).toBe(false);
});

test("Return `true` for action type `CORRECT_GUESS`", () => {
  const newState = successReducer(false, { type: actionTypes.CORRECT_GUESS });
  expect(newState).toBe(true);
});
