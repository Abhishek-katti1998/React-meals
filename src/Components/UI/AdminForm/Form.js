import React from "react";
import ReactDOM from "react-dom";
import Input from "./input/input";
const Form = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Input show={props.show} />,
        document.getElementById("Admin-root")
      )}
    </React.Fragment>
  );
};
export default Form;
