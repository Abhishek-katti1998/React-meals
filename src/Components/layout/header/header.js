import React, { useState, useContext, useEffect } from "react";
import classes from "./header.module.css";
import Cart from "../../cart/cart";
import Description from "../Description/description";
import Admin from "../Admin/Admin";
import Form from "../../UI/AdminForm/Form";
import BackDrop from "../../UI/Backdrop/backdrop";
import Menue from "../../UI/Hamburger/hamburger";
import HamModel from "../../UI/HamBurgerModel/model";
import Logout from "../../UI/logout/logout";
import Order from "../../UI/Orders/Order";
import AuthContext from "../../../Context/AuthContext";
import BtnSpinner from "../../UI/spinner/btnspinner/spinner";

const Header = function (props) {
  const cartDom = document.querySelector("#cart");
  const ctx = useContext(AuthContext);

  const [showForm, setShowFrom] = useState(false);
  const [showModelHam, setModelHam] = useState(false);

  let [Loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const menueHandler = () => {
    setModelHam((p) => !p);
  };
  const adminClickHandler = () => {
    setShowFrom((prev) => !prev);
  };
  const removeAdminFormHandler = () => {
    setShowFrom(false);
    setModelHam(false);
  };
  const subscribe = (loading, name) => {
    setLoading(loading);
    setName(name);
  };

  return (
    <React.Fragment>
      {showForm || showModelHam ? (
        <BackDrop click={removeAdminFormHandler} />
      ) : null}
      <header className={classes.header}>
        {!showModelHam ? <Menue click={menueHandler} /> : null}

        <Cart />
      </header>

      <HamModel show={showModelHam} subscribe={subscribe}>
        {Loading && !localStorage.getItem("name") ? (
          <BtnSpinner />
        ) : (
          <h3>{`Hello ${
            localStorage.getItem("name") ? localStorage.getItem("name") : name
          } :)`}</h3>
        )}
        <Logout />
        {<Order />}

        <Admin click={adminClickHandler} />
      </HamModel>

      <div className={classes["main-image"]}>
        <img src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" />
      </div>

      <Form show={showForm} />
      <Description />
    </React.Fragment>
  );
};
export default Header;
