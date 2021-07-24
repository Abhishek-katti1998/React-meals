import classes from "./Admin.module.css";
import React from "react";
const Admin = (props) => (
  <React.Fragment>
    <button className={classes.button} onClick={props.click}>
      Admin
    </button>
  </React.Fragment>
);
export default Admin;
