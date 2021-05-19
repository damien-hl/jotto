import { ReactWrapper, ShallowWrapper } from "enzyme";
import { checkPropTypes } from "prop-types";

/**
 * Utility function to find and return node(s) with the given data-test attribute
 *
 * @param {ShallowWrapper|ReactWrapper} wrapper Enzyme shallow wrapper
 * @param {string} val Valiue of data-test attribute for search
 * @returns {ShallowWrapper}
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
