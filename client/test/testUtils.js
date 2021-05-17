import { checkPropTypes } from "prop-types";
import { ReactWrapper, ShallowWrapper } from "enzyme";
import { applyMiddleware, createStore, Store } from "redux";

import rootReducer from "../src/reducers";
import { middlewares } from "../src/configureStore";

/**
 * Create a testing store with imported reducers, middleware and initial state
 *
 * @function storeFactory
 * @param {object} initialState Initial state to store
 * @returns {Store} Redux store
 */
export const storeFactory = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
};

/**
 * Utility function to find and return node(s) with the given data-test attribute
 *
 * @param {ShallowWrapper|ReactWrapper} wrapper Enzyme shallow wrapper
 * @param {string} val Valiue of data-test attribute for search
 * @returns {ShallowWrapper|ReactWrapper}
 */
export const findByTestAttr = (wrapper, val) =>
  wrapper.find(`[data-test="${val}"]`);

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};
