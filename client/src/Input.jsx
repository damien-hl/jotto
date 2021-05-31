import React, { useContext } from "react";
import PropTypes from "prop-types";
import { getLetterMatchCount } from "./helpers";
import guessedWordsContext from "./contexts/guessedWordsContext";
import successContext from "./contexts/successContext";
import languageContext from "./contexts/languageContext";
import stringsModule from "./helpers/strings";

/**
 * Functionnal React component for input field
 *
 * @function Input
 * @param {{secretWord: string}} props Props for this component
 * @returns {JSX.Element} Rendered component
 */
const Input = ({ secretWord }) => {
  const language = useContext(languageContext);
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();
  const [success, setSuccess] = successContext.useSuccess();
  const [currentGuess, setCurrentGuess] = React.useState("");

  const handleClick = (event) => {
    event.preventDefault();
    // Update guessedWords
    const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);
    const newGuessedWords = [
      ...guessedWords,
      { guessedWord: currentGuess, letterMatchCount },
    ];
    setGuessedWords(newGuessedWords);

    // Check against secretWord and update success if necessary
    if (currentGuess === secretWord) {
      setSuccess(true);
    }
    // Clear the input box
    setCurrentGuess("");
  };

  if (success) {
    return <div data-test="component-input"></div>;
  }

  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          type="text"
          placeholder={stringsModule.getStringByLanguage(
            language,
            "guessInputPlaceholder"
          )}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
          className="mb-2 mx-sm-3"
        />
        <button
          data-test="submit-button"
          type="submit"
          onClick={handleClick}
          className="btn btn-primary mb-2"
        >
          {stringsModule.getStringByLanguage(language, "submit")}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  success: PropTypes.bool,
  secretWord: PropTypes.string.isRequired,
};

export default Input;
