import React, { useContext } from "react";
import classes from "./Button.module.css";
import ItemCountContext from "../../../Context/Item-count-context";
import { CartHandlerContext } from "../../../Context/Item-count-context";
// import { RiShoppingCartLine } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
const Button = (props) => {
  const ctxItemCount = useContext(ItemCountContext);
  let totalItemCount = 0;
  ctxItemCount.ingCount.forEach((el) => {
    totalItemCount += el.ingCount;
  });
  //-------------------cart related------------------------
  const cartClick = useContext(CartHandlerContext);
  // console.log(cartClick.cartHandler);
  //-------------------cart related-----------------------
  console.log("render called________Button.js");
  const btnClass = cartClick.classes;
  return (
    <button className={btnClass} onClick={cartClick.cartHandler}>
      <i className={classes.icon}></i>
      <FaShoppingCart style={{ position: "relative", right: "10px" }} />
      Your Cart
      <div className={classes.badge}>{totalItemCount}</div>
    </button>
  );
};
export default Button;
