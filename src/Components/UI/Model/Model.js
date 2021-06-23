import React, { useContext } from "react";
import ReactDOM from "react-dom";
import classes from "./Model.module.css";
import ModelContent from "./Model-content/Model-content";
import { CartHandlerContext } from "../../../Context/Item-count-context";
import ItemCountContext from "../../../Context/Item-count-context";
import Total from "./cart-total/total";
const ModelOverlay = (props) => {
  const closeModelHandler = useContext(CartHandlerContext);
  const selectedItems = useContext(ItemCountContext);
  let renderModelContent = [];
  // console.log(ItemCountContext.ingCount);
  selectedItems.ingCount.forEach((el, index) => {
    if (el.ingCount > 0) {
      renderModelContent.push(
        <ModelContent
          dish={el.dish}
          price={el.price}
          amount={el.ingCount}
          id={index}
          key={index}
        />
      );
    }
  });
  console.log("render___called____Model.js");
  return (
    <div className={classes.Container}>
      {renderModelContent}
      <Total />
      <button
        className={classes.Close}
        style={{ position: "relative", left: "340px", bottom: "10px" }}
        onClick={closeModelHandler.cartHandler}
      >
        Close
      </button>
      <button
        className={classes.Order}
        style={{ position: "relative", left: "350px", bottom: "10px" }}
      >
        Order
      </button>
    </div>
  );
};
const Model = () => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ModelOverlay />,
        document.getElementById("model-root")
      )}
    </React.Fragment>
  );
};
export default Model;
