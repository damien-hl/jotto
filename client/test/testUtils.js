import { ShallowWrapper } from "enzyme";

/**
 * Utility function to find and return node(s) with the given data-test attribute
 * 
 * @param {ShallowWrapper} wrapper Enzyme shallow wrapper
 * @param {string} val Valiue of data-test attribute for search
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);