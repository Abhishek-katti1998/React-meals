import React from "react";
import ReactDOM from "react-dom";
const ErrorComponent = () => (
  <React.Fragment>
    {ReactDOM.createPortal(
      <h3
        style={{
          color: "red",
          zIndex: "10",
          display: "flex",
          allignItems: "center",
          position: "relative",
          left: "600px",
          width: "250px",
          borderRadius: "10px",
          backgroundColor: "white",
          top: "200px",
        }}
      >
        Something went wrong ;(
      </h3>,
      document.getElementById("root-Error")
    )}
  </React.Fragment>
);

export default ErrorComponent;
