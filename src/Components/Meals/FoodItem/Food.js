import React, { useContext } from "react";
import classes from "./Food.module.css";
import ItemCountContext from "../../../Context/Item-count-context";
const Food = (props) => {
  const ingContext = useContext(ItemCountContext);
  const showBtnHandler = (event) => {
    props.addInitially(event.target.id);
  };
  let rendBtn;
  if (ingContext.ingCount[props.index].ingCount === 0) {
    rendBtn = (
      <button
        className={classes.addBtn}
        onClick={showBtnHandler}
        id={props.index}
      >
        Add
      </button>
    );
  } else {
    rendBtn = (
      <React.Fragment>
        <button onClick={props.add} id={props.index} className={classes.Add}>
          +
        </button>
        <button
          onClick={props.remove}
          id={props.index}
          style={{ marginLeft: "20px" }}
          className={classes.remove}
        >
          -
        </button>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.Container}>
      <div className={classes.childContainer}>
        <h3 style={{ color: "white" }}>{props.dish}</h3>
        <p style={{ fontFamily: "sans-serif" }}>{props.foodDescription}</p>
        <h3 style={{ color: "white" }}>{props.price}</h3>
      </div>
      <div className={classes.childContainer} id={classes.amount}>
        <h3 style={{ color: "white" }}>Amount</h3>
        <input
          className={classes.amt}
          value={`${props.amount === 0 ? "" : "×" + props.amount}`}
          onChange={() => {}}
          style={{
            backgroundColor: "#282c34",
            color: "white",
            borderColor: "#282c34",
          }}
        />
        {rendBtn}
      </div>
    </div>
  );
};
export default Food;
