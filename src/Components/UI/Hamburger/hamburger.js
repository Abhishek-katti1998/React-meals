import React from "react";
import classes from "./hamburger.module.css";
const Menue = (props) => (
  <div className={classes.Container} onClick={props.click}>
    <div className={classes.parts}></div>
    <div className={classes.parts}></div>
    <div className={classes.parts}></div>
  </div>
);
export default Menue;
