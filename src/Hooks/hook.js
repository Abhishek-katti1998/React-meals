import React, { useEffect, useState } from "react";
const useInput = (validate) => {
  const [enteredText, setEnteredText] = useState("");
  const [ipTouched, setIpTouched] = useState(false);
  const validText = validate(enteredText);
  const hasError = !validText && ipTouched;
  const textInputChangeHandler = (event) => {
    setEnteredText(event.target.value);
  };
  const ipblurHandler = (event) => {
    setIpTouched(true);
  };
  const reset = () => {
    setEnteredText("");
    setIpTouched(false);
  };
  return [enteredText, hasError, textInputChangeHandler, ipblurHandler, reset];
};
export default useInput;
