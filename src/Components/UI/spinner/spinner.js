import "./spinner.css";
import ReactDOM from "react-dom";
import React from "react";
const Spinner = () => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>,
        document.getElementById("root-spinner")
      )}
    </React.Fragment>
  );
};
export default Spinner;
