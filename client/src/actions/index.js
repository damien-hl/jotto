import axios from "axios";

/**
 * Action creator
 *
 * @param {Function} setSecretWord Setter for the secret word
 */
export const getSecretWord = async (setSecretWord) => {
  // TODO: Write actual action in Redux / Context section
  const response = await axios.get("http://localhost:3030");
  setSecretWord(response.data);
};
