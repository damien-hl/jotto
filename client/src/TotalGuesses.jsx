import React from "react";
import propTypes from "prop-types";

/**
 * Total guesses component
 *
 * @function TotalGuesses
 * @param {{guessCount: number}} props Component props specific to this setup
 * @returns {JSX.Element} Rendered component
 */
const TotalGuesses = ({ guessCount }) => {
  return (
    <h4 data-test="component-total-guesses">Total Guesses: {guessCount}</h4>
  );
};

TotalGuesses.propTypes = {
  guessCount: propTypes.number.isRequired,
};

export default TotalGuesses;
