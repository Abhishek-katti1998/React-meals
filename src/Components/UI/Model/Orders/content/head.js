import classes from "./content.module.css";
const Head = () => {
  return (
    <div className={classes.ContentHeader}>
      <h3>Dish</h3>
      <h3>Price</h3>
      <h3>Amount</h3>
    </div>
  );
};
export default Head;
