import React, { useContext } from "react";
import Proptypes from "prop-types";

import languageContext from "./contexts/languageContext";
import stringsModule from "./helpers/strings";

/**
 * Functionnal React component for congratulatory message
 *
 * @function Congrats
 * @param {{success: boolean}} props React props
 * @returns {JSX.Element} Rendered component (or null if `success` prop is false)
 */
const Congrats = ({ success }) => {
  const language = useContext(languageContext);

  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, "congrats")}
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};

Congrats.propTypes = {
  success: Proptypes.bool.isRequired,
};

export default Congrats;
