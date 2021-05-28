import React, { useEffect } from "react";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import { getSecretWord } from "./actions";

// Components
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import LanguagePicker from "./LanguagePicker";

// Styles
import "./App.css";

/**
 * Reducer to update state, automatically called by dispatch
 *
 * @function reducer
 * @param {object} state previous state
 * @param {object} action A type prop and a payload
 * @returns {object} New state
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    case "setLanguage":
      return { ...state, language: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

/**
 * Main React component
 *
 * @function App
 * @returns {JSX.Element} Rendered App component
 */
function App() {
  // const [secretWord, setSecretWord] = useState("");
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
    language: "en",
  });

  const guessedWords = [];

  const setSecretWord = (secretWord) => {
    dispatch({ type: "setSecretWord", payload: secretWord });
  };

  const setLanguage = (language) => {
    dispatch({ type: "setLanguage", payload: language });
  };

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  if (state.secretWord === null) {
    return (
      <div data-test="spinner" className="container">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
        <p>Loading secret word...</p>
      </div>
    );
  }

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <successContext.SuccessProvider>
          <Congrats />
          <Input secretWord={state.secretWord} />
        </successContext.SuccessProvider>
        <GuessedWords guessedWords={guessedWords} />
      </languageContext.Provider>
    </div>
  );
}

export default App;
