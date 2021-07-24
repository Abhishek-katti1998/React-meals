import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./Model.module.css";
import ModelContent from "./Model-content/Model-content";
import { CartHandlerContext } from "../../../Context/Item-count-context";
import ItemCountContext from "../../../Context/Item-count-context";
import Total from "./cart-total/total";
import CheckOut from "./Checkout/CheckoutForm";
const ModelOverlay = (props) => {
  const closeModelHandler = useContext(CartHandlerContext);
  const selectedItems = useContext(ItemCountContext);
  const [showCheckout, setCheckout] = useState(false);

  const placeOrderHandler = () => {
    setCheckout((p) => !p);
  };

  const closeCheckourModel = (arg) => {
    setCheckout(false);

    arg.forEach((el) => {
      if (el.ingCount > 0) {
        el.ingCount = 0;
      } else {
        return;
      }
    });
    return arg;
  };
  let renderModelContent = [];

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
  const closeForm = () => {
    setCheckout(false);
  };
  const classe = props.show ? classes.ContainerOpend : classes.ContainerClosed;

  return (
    <div className={classe}>
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
        onClick={placeOrderHandler}
      >
        Order
      </button>
      {showCheckout ? (
        <CheckOut closeCheckoutForm={closeCheckourModel} close={closeForm} />
      ) : null}
    </div>
  );
};
const Model = (props) => {
  console.log(props.add);
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ModelOverlay show={props.show}></ModelOverlay>,
        document.getElementById("model-root")
      )}
    </React.Fragment>
  );
};
export default Model;
