import React, { useContext } from "react";

import successContext from "./contexts/successContext";
import languageContext from "./contexts/languageContext";
import stringsModule from "./helpers/strings";

/**
 * Functionnal React component for congratulatory message
 *
 * @function Congrats
 * @returns {JSX.Element} Rendered component (or null if `success` prop is false)
 */
const Congrats = () => {
  const [success] = successContext.useSuccess();
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

export default Congrats;
