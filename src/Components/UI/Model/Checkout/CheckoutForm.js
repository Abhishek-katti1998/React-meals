import "./Checkout.css";
import useInput from "../../../../Hooks/hook";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import "../../AdminForm/input/input.css";
import ItemCountContext from "../../../../Context/Item-count-context";
import AuthContext from "../../../../Context/AuthContext";
const CheckOut = (props) => {
  const ctx = useContext(ItemCountContext);
  const emailCtx = useContext(AuthContext);
  let timer;
  const [showMessege, setShowMessege] = useState(false);
  const [
    enteredName,
    nameIphasError,
    nameInputChangeHandler,
    nameIpblurHandler,
    resetName,
  ] = useInput((value) => value.trim() !== "");
  const [
    enteredStreet,
    streetIphasError,
    streetInputChangeHandler,
    streetIpblurHandler,
    resetStreet,
  ] = useInput((value) => value.trim() !== "");
  const [
    enteredZip,
    zipIphasError,
    zipInputChangeHandler,
    zipIpblurHandler,
    resetZip,
  ] = useInput((value) => value.trim() !== "" && value.length === 6);
  const [
    enteredCity,
    cityIphasError,
    cityInputChangeHandler,
    cityIpblurHandler,
    resetCity,
  ] = useInput((value) => value.trim() !== "");

  const enteredNameClass = nameIphasError
    ? "form-control invalid"
    : "form-control  ";
  const enteredStreetClass = streetIphasError
    ? "form-control invalid"
    : "form-control";
  const enteredZipClass = zipIphasError
    ? "form-control invalid"
    : "form-control";
  const enteredCityClass = cityIphasError
    ? "form-control invalid"
    : "form-control";
  const orders = ctx.ingCount.filter((el) => el.ingCount > 0);
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const userData = {
      enteredName,
      enteredStreet,
      enteredZip,
      enteredCity,
      orders,
      email: emailCtx.emailId,
    };
    fetch("https://react-http-3d0d9-default-rtdb.firebaseio.com/users.json", {
      method: "POST",
      body: JSON.stringify(userData),
    })
      .then((el) => {
        // console.log(el);
        if (localStorage.getItem("name") === "User") {
          localStorage.setItem(userData.enteredName);
        }
        timer = setTimeout(() => {
          const clearedCartVal = props.closeCheckoutForm(ctx.ingCount);
          ctx.clearCart(clearedCartVal);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });

    setShowMessege(true);
    resetName();
    resetStreet();
    resetZip();
    resetCity();
  };
  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <form onSubmit={formSubmitHandler} className="rootForm">
      <h1
        style={{ position: "absolute", margin: "auto", right: "50px" }}
        onClick={() => props.close()}
      >
        ×
      </h1>
      <div className={enteredNameClass}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameIpblurHandler}
          value={enteredName}
        />
        {nameIphasError && <p className="error-text">name invalid</p>}
      </div>
      <div className={enteredStreetClass}>
        <label htmlFor="name">Street Name</label>
        <input
          type="text"
          id="streetName"
          onChange={streetInputChangeHandler}
          onBlur={streetIpblurHandler}
          value={enteredStreet}
        />
        {streetIphasError && <p className="error-text"> street invalid </p>}
      </div>
      <div className={enteredZipClass}>
        <label htmlFor="name">Zip Code</label>
        <input
          type="text"
          id="zipCode"
          onChange={zipInputChangeHandler}
          onBlur={zipIpblurHandler}
          value={enteredZip}
        />
        {zipIphasError && <p className="error-text"> Zip invalid </p>}
      </div>
      <div className={enteredCityClass}>
        <label htmlFor="name">City</label>
        <input
          type="text"
          id="City"
          onChange={cityInputChangeHandler}
          onBlur={cityIpblurHandler}
          value={enteredCity}
        />
        {cityIphasError && <p className="error-text"> City invalid </p>}
      </div>
      {/* {serverError ? <p style={{ color: "red" }}>Server Error ;(</p> : null} */}
      <div className="form-actions">
        <button className="ipBtn">Confirm</button>
      </div>
      {showMessege ? (
        <p style={{ color: "green" }}>Orderd Succesfully!! :)</p>
      ) : null}
    </form>
  );
};
export default CheckOut;
