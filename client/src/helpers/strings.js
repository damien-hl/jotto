const languageStrings = {
  en: {
    congrats: "Congratulations! You guessed the word!",
    submit: "Submit",
    guessPrompt: "Try to guess the secret word!",
    guessInputPlaceholder: "enter guess",
    guessColumnHeader: "Guessed Words",
    guessedWords: "Guesses",
    matchingLettersColumnHeader: "Matching Letters",
  },
  emoji: {
    congrats: "🎯🎉",
    submit: "🚀",
    guessPrompt: "🤔🤫🔤",
    guessInputPlaceholder: "⌨️🤔",
    guessedWords: "🤷‍🔤",
    guessColumnHeader: "🤷‍",
    matchingLettersColumnHeader: "✅",
  },
};

/**
 * Returns the translation for a given language and key
 *
 * @function getStringByLanguage
 * @param {string} languageCode Code to identity the language
 * @param {string} stringKey Key for the translation
 * @param {object} strings Object containing all the translations
 * @returns {string} Returns the translation
 */
function getStringByLanguage(
  languageCode,
  stringKey,
  // eslint-disable-next-line no-unused-vars
  strings = languageStrings
) {
  if (!strings[languageCode] || !strings[languageCode][stringKey]) {
    console.warn(`Could not get string [${stringKey}] for [${languageCode}]`);
    return strings.en[stringKey];
  }

  return strings[languageCode][stringKey];
}

export default { getStringByLanguage };
