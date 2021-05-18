import React from "react";
import PropTypes from "prop-types";

/**
 * New word button component to restart a game
 *
 * @function NewWordButton
 * @param {{display: boolean, resetAction: Function}} props React props
 * @returns {JSX.Element} Rendered component
 */
const NewWordButton = ({ display, resetAction }) => {
  if (display) {
    return (
      <button
        data-test="component-new-word-button"
        onClick={resetAction}
        className="btn btn-primary"
      >
        New word
      </button>
    );
  } else {
    return <div data-test="component-new-word-button"></div>;
  }
};

NewWordButton.propTypes = {
  display: PropTypes.bool.isRequired,
  resetAction: PropTypes.func,
};

export default NewWordButton;
