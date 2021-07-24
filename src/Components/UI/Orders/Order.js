import classes from "./Order.module.css";

const Order = (props) => {
  const renderOrderHandler = () => {
    console.log(JSON.parse(localStorage.getItem("data")));
  };

  return (
    <button className={classes.button} onClick={renderOrderHandler}>
      Your Orders
    </button>
  );
};
export default Order;
