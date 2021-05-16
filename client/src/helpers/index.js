/**
 * Returns the number of letters in common between guessed word and secret word
 *
 * @function getLetterMatchCount
 * @param {string} guessedWord Word entered by user
 * @param {string} secretWord Word to guess by the user
 * @returns {number}
 */
export function getLetterMatchCount(guessedWord, secretWord) {
  const secretLetters = secretWord.split("");
  const guessedLetterSet = new Set(guessedWord);

  return secretLetters.filter((letter) => guessedLetterSet.has(letter)).length;
}
