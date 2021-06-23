import React from "react";
import classes from "./header.module.css";
import mealsImage from "./meals.jpg";
import Cart from "../../cart/cart";
import Description from "../Description/description";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = function (props) {
  console.log("renderCalled__header.js");
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1 style={{ position: "relative", left: "35px" }}>Home</h1>
        {/* <FontAwesomeIcon icon={faHome} /> */}
        {/* <i class="fas fa-shopping-cart"></i> */}
        <Cart />
      </header>
      <div className={classes["main-image"]}>
        <img src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" />
      </div>
      <Description />
    </React.Fragment>
  );
};
export default Header;
