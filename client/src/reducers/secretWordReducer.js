import { actionTypes } from "../actions";

/**
 * @function secretWordReducer
 * @param {string} state Secret word
 * @param {object} action Action to be reduced
 * @returns {string}
 */
export default (state = "", action) => {
  switch (action.type) {
    case actionTypes.SET_SECRET_WORD:
      return action.payload;
    default:
      return state;
  }
};
