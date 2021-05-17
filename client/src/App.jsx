import React, { useEffect } from "react";
import { useSelector } from "react-redux";
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
  const success = useSelector((state) => state.success);
  const guessedWords = useSelector((state) => state.guessedWords);

  // TODO: Get props from shared state
  const secretWord = "party";

  useEffect(() => {
    getSecretWord();
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
