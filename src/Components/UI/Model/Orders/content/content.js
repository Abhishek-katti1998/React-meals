import React from "react";
import classes from "./content.module.css";
const Content = (props) => (
  <div className={classes.Content}>
    <div>{props.dish}</div>
    <div style={{ position: "fixed", left: "700px" }}>{props.price}</div>
    <div style={{ position: "relative", right: "30px" }}>{props.amount}</div>
  </div>
);
export default Content;
