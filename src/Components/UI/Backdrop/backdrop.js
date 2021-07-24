import React from "react";
import ReactDOM from "react-dom";
import classes from "./backdrop.module.css";
const BackDropOverlay = (props) => {
  return (
    <div className={classes.Container} onClick={props.click}>
      {" "}
    </div>
  );
};
const BackDrop = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDropOverlay click={props.click} />,
        document.getElementById("backdrop-root")
      )}
    </React.Fragment>
  );
};
export default BackDrop;
