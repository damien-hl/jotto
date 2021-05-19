import React, { useEffect, useState } from "react";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import { getSecretWord } from "./actions";
import "./App.css";

/**
 * Main React component
 *
 * @function App
 * @returns {JSX.Element} Rendered App component
 */
function App() {
  const [secretWord, setSecretWord] = useState("");
  // TODO: Get props from shared state
  const success = false;
  const guessedWords = [];

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input success={success} secretWord={secretWord} />
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
}

export default App;
