import React, { useContext } from "react";
import classes from "./total.module.css";
import ItemCountContext from "../../../../Context/Item-count-context";
const Total = () => {
  const ing = useContext(ItemCountContext);
  const totalPrice = ing.ingCount
    .map((el) => {
      return Number(el.price.split("$")[1]) * el.ingCount;
    })
    .reduce((el, acc) => el + acc, 0);

  return (
    <div className={classes.Container}>
      <h3 style={{ position: "relative", left: "50px" }}>Total Amount</h3>
      <h3
        style={{ position: "relative", left: "380px" }}
      >{`$${totalPrice}`}</h3>
    </div>
  );
};
export default Total;
