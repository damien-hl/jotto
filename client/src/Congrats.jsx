import React from "react";
import propTypes from "prop-types";

/**
 * Functionnal React component for congratulatory message
 *
 * @function Congrats
 * @param {{success: boolean}} props React props
 * @returns {JSX.Element} Rendered component (or null if `success` prop is false)
 */
const Congrats = ({ success }) => {
  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          Congratulations! You guessed the word!
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};

Congrats.propTypes = {
  success: propTypes.bool.isRequired,
};

export default Congrats;
