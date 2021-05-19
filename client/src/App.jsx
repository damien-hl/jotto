import React, { useEffect } from "react";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import { getSecretWord } from "./actions";
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
  switch (action.state) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
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
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null });

  const success = false;
  const guessedWords = [];

  const setSecretWord = (secretWord) => {
    dispatch({ type: "setSecretWord", payload: secretWord });
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
      <Congrats success={success} />
      <Input success={success} secretWord={state.secretWord} />
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
}

export default App;
