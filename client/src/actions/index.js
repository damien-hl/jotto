import axios from "axios";
import { getLetterMatchCount } from "../helpers";

export const actionTypes = {
  CORRECT_GUESS: "CORRECT_GUESS",
  GUESS_WORD: "GUESS_WORD",
};

// /**
//  * @function correctGuess
//  * @returns {object} Action object with type `CORRECT_GUESS`
//  */
// export function correctGuess() {
//   return { type: actionTypes.CORRECT_GUESS };
// }

/**
 * Returns Redux Thunk function that dispatches GUESS_WORD action and
 * (conditionally) CORRECT_GUESS action
 *
 * @function guessWord
 * @param {string} guessedWord Guessed word
 * @returns {Function} Redux Thunk function
 */
// eslint-disable-next-line no-unused-vars
export const guessWord = (guessedWord) => {
  // eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: { guessedWord, letterMatchCount },
    });

    if (guessedWord === secretWord) {
      dispatch({ type: actionTypes.CORRECT_GUESS });
    }
  };
};

export const getSecretWord = () => {
  // TODO: Write actual action in Redux / Context section
  return axios.get("http://localhost:3030").then((response) => response.data);
};
