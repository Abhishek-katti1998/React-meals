import classes from "./Model-content.module.css";
import {
  AddItemCartContext,
  RemoveItemCartContext,
} from "../../../../Context/Item-count-context";
import { useContext } from "react";
const ModelContent = (props) => {
  const cartHandleAdd = useContext(AddItemCartContext);
  const cartHandleRemove = useContext(RemoveItemCartContext);
  console.log("render__called______Model-content.js");
  return (
    <div className={classes.Container}>
      <div className={classes.Content}>
        <h3>{props.dish}</h3>
        <div style={{ position: "relative", bottom: "10px", color: "white" }}>
          {props.price}
        </div>
      </div>
      <div className={classes.amount}>
        <h3
          style={{
            fontSize: "15px",
            position: "relative",
            color: "white",
            bottom: "17px",
            right: "1px",
          }}
        >
          {`×${props.amount}`}
        </h3>
      </div>
      <button
        className={classes.add}
        onClick={cartHandleAdd.addHandler}
        id={props.id}
      >
        +
      </button>
      <button
        className={classes.remove}
        onClick={cartHandleRemove.removeHandler}
        id={props.id}
      >
        -
      </button>
    </div>
  );
};
export default ModelContent;
