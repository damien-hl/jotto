import { actionTypes } from "../actions";

/**
 * @function guessedWordsReducer
 * @param {Array} state Array of guessed words
 * @param {object} action Action to be reduced
 * @returns {Array}
 */
// eslint-disable-next-line no-unused-vars
export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.GUESS_WORD:
      return [...state, action.payload];
    default:
      return state;
  }
};
