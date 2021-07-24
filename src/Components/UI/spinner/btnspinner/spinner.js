import classes from "./spinner.module.css";
const BtnSpinner = () => {
  return (
    <div className={classes.ldsEllipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
export default BtnSpinner;
