import "./model.css";
import ReactDOM from "react-dom";
import AuthContext from "../../../Context/AuthContext";
import React, { useContext, useEffect } from "react";
import { Transition } from "react-transition-group";
import { apiCall, compare } from "../../../Helpers/api-call";
const Ham = (props) => {
  const ctx = useContext(AuthContext);

  const animationTiming = {
    enter: 200,
    exit: 800,
  };

  return (
    <Transition
      in={props.show}
      timeout={animationTiming}
      mountOnEnter
      unmountOnExit
    >
      {(state) => {
        if (
          state === "entered" &&
          !localStorage.getItem("data") &&
          !localStorage.getItem("name")
        ) {
          console.log("ANIMATIN");
          const promise = apiCall();
          promise
            .then((el) => {
              const data = compare(el, ctx.emailId);
              props.subscribe(false, data[0].enteredName);
              localStorage.setItem("data", JSON.stringify(data));
              localStorage.setItem("name", data[0].enteredName);
            })
            .catch((err) => {
              props.subscribe(false, "User");
              console.log("ERROR IS ", err);
            });
        }

        const cssClass = ["Container"];
        if (state === "entering") {
          cssClass.push("Open");
        }
        if (state === "exiting") {
          cssClass.push("Close");
        }
        return <div className={cssClass.join("")}>{props.children}</div>;
      }}
    </Transition>
  );
};

const HamModel = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Ham show={props.show} subscribe={props.subscribe}>
          {props.children}
        </Ham>,
        document.getElementById("HamBurger-root")
      )}
    </React.Fragment>
  );
};
export default HamModel;
