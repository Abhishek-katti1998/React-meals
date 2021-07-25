import React from "react";
import ReactDom from "react-dom";
import classes from "./order.module.css";
import Head from "./content/head";
import Content from "./content/content";
const OrderUi = (props) => {
  return ReactDom.createPortal(
    <React.Fragment>
      <div className={classes.Container}>
        <div className={classes.btn} onClick={props.close}>
          ×
        </div>
        {!localStorage.getItem("name") ? (
          <h3
            style={{
              color: "red",
              position: "absolute",
              left: "130px",
              bottom: "1px",
            }}
          >
            No orders found ;(
          </h3>
        ) : (
          <Head />
        )}
        {props.data.map((el, index1) =>
          el.map((d, index2) => (
            <Content
              dish={d.dish}
              price={d.price}
              amount={d.ingCount}
              key={index1 + index2}
            />
          ))
        )}
      </div>
    </React.Fragment>,
    document.getElementById("orders")
  );
};
export default OrderUi;
