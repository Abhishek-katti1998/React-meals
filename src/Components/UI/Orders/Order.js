import classes from "./Order.module.css";

const Order = (props) => {
  return (
    <button className={classes.button} onClick={props.renderOrderHandler}>
      Your Orders
    </button>
  );
};
export default Order;
