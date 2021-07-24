import { useState, useContext, useEffect } from "react";
import useInput from "../../../../Hooks/hook";
import "./input.css";
import ItemCountContext from "../../../../Context/Item-count-context";

class Dish {
  constructor(name, description, price, index) {
    this.dish = name;
    this.foodDescription = description;
    this.price = `$${price}`;
    this.ingCount = 0;
    this.index = index;
  }
}
const Input = (props) => {
  let timer;
  const ctxItem = useContext(ItemCountContext);
  const [succes, setSuccces] = useState(false);
  const [
    enteredDish,
    dishIphasError,
    dishInputChangeHandler,
    dishIpblurHandler,
    resetDish,
  ] = useInput((value) => value.trim() !== "");
  const [
    enteredDescription,
    descriptionphasError,
    descriptionChangeHandler,
    descriptionblurHandler,
    resetDescription,
  ] = useInput((value) => value.trim() !== "");
  const [
    enteredPrice,
    pricehasError,
    priceChangeHandler,
    priceblurHandler,
    resetPrice,
  ] = useInput((value) => value.trim() !== "");
  // const [dishes, setEnteredDishes] = useState([]);
  let [serverError, setServerError] = useState(false);
  const sendData = async function (items) {
    try {
      const response = await fetch(
        "https://react-http-3d0d9-default-rtdb.firebaseio.com/-MdquxpaGp0BSa5Cvrpi.json",
        {
          method: "POST",
          body: JSON.stringify(items),
        }
      );
      const resData = await response.json();
      setSuccces(true);
      timer = setTimeout(() => {
        setSuccces(false);
      }, 5000);
      return resData;
    } catch {
      console.log("ERROR");
      setServerError(true);
    }
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredDish === "" || enteredDescription === "" || enteredPrice === "")
      return;
    else {
      const obj = new Dish(
        enteredDish,
        enteredDescription,
        enteredPrice,
        ctxItem.ingCount.length
      );
      ctxItem.ingCount.push(obj);
      const d = sendData(obj);
    }
    resetDish();
    resetDescription();
    resetPrice();
  };
  const enteredDishClass = dishIphasError
    ? "form-control invalid"
    : "form-control  ";
  const enteredDescriptionClass = descriptionphasError
    ? "form-control invalid"
    : "form-control";
  const enteredPriceClass = pricehasError
    ? "form-control invalid"
    : "form-control";
  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  });
  const cssClass = props.show ? "rootFormOpen" : "rootFormClose";
  return (
    <form onSubmit={formSubmitHandler} className={cssClass}>
      <div className={enteredDishClass}>
        <label htmlFor="name">Dish Name</label>
        <input
          type="text"
          id="name"
          onChange={dishInputChangeHandler}
          onBlur={dishIpblurHandler}
          value={enteredDish}
        />
        {dishIphasError && <p className="error-text">Dish invalid</p>}
      </div>
      <div className={enteredDescriptionClass}>
        <label htmlFor="name">Description</label>
        <input
          type="text"
          id="email"
          onChange={descriptionChangeHandler}
          onBlur={descriptionblurHandler}
          value={enteredDescription}
        />
        {descriptionphasError && (
          <p className="error-text"> Description invalid </p>
        )}
      </div>
      <div className={enteredPriceClass}>
        <label htmlFor="name">Price</label>
        <input
          type="text"
          id="email"
          onChange={priceChangeHandler}
          onBlur={priceblurHandler}
          value={enteredPrice}
        />
        {pricehasError && <p className="error-text"> Price invalid </p>}
      </div>
      {serverError ? (
        <p style={{ color: "red" }}>Server Error ;(</p>
      ) : succes ? (
        <p style={{ color: "green" }}>Data Sent Succesfully!! :)</p>
      ) : null}
      <div className="form-actions">
        <button className="ipBtn">Submit</button>
      </div>
    </form>
  );
};

export default Input;
