import React, { useContext } from "react";
import PropTypes from "prop-types";

import languageContext from "./contexts/languageContext";
import stringsModule from "./helpers/strings";

/**
 * Functionnal React component for input field
 *
 * @function Input
 * @param {{success: boolean}} props React props
 * @returns {JSX.Element} Rendered component
 */
const Input = ({ success }) => {
  const [currentGuess, setCurrentGuess] = React.useState("");
  const language = useContext(languageContext);

  const handleClick = (event) => {
    event.preventDefault();
    // TODO: Update guessedWords
    // TODO: Check against secretWord and update success if needed
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
