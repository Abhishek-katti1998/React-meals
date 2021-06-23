import classes from "./description.module.css";
const Description = () => {
  console.log("renderCalled______Description.js");
  return (
    <div className={classes.des}>
      <h3>Will be deliverd at your door step :)</h3>
      <p style={{ position: "relative", bottom: "18px" }}>
        choose your favourite food from the board, the food is cooked under very
        hygenic environment which is actually true!!
      </p>
    </div>
  );
};
export default Description;
