import "./App.css";
import TransitionGroup from "react-transition-group/Transition";
import Background from "./Components/layout/header/header";
import MainCourse from "./Components/Meals/Meals";
import React, { useState, useEffect, useCallback, useContext } from "react";
import ItemCountContext from "./Context/Item-count-context";
import { CartHandlerContext } from "./Context/Item-count-context";
import AuthContext from "./Context/AuthContext";
import classes from "./Components/layout/cartbtn/Button.module.css";
import Auth from "./Components/UI/Auth/Auth";
import {
  AddItemCartContext,
  RemoveItemCartContext,
} from "./Context/Item-count-context";
import Model from "./Components/UI/Model/Model";
import BackDrop from "./Components/UI/Backdrop/backdrop";
import Spinner from "./Components/UI/spinner/spinner";
import ErrorComponent from "./Components/UI/Error/error";

function App() {
  //****default Food Items****
  const AuthCtx = useContext(AuthContext);
  const items = [
    {
      dish: "Sushi",
      index: 0,
      foodDescription: "fesh fish and veggies",
      price: "$22",
      ingCount: 0,
    },
    {
      dish: "Schnitzel",
      index: 1,
      foodDescription: "A general speciality",
      price: "$16",
      ingCount: 0,
    },
    {
      dish: "Bawarchi Biryani",
      foodDescription: "Hydrabad special",
      index: 2,
      price: "$25",
      ingCount: 0,
    },
  ];
  //**************************************************************
  //Main Course food items functionality(add and remove)
  const [showModel, setModel] = useState(false);
  const [showBup, setShowBump] = useState(false);
  const [ing, setIngCount] = useState([]);
  const [isLoading, setLoadingState] = useState(false);
  const [loadingErr, setLoadingErr] = useState(false);
  const ingUpdate = (targetIndex, flag) => {
    let tempIngCnt = [...ing];

    if (flag === 1) tempIngCnt[targetIndex].ingCount += 1;
    if (flag === -1) {
      if (tempIngCnt[targetIndex].ingCount === 0) {
      }
      tempIngCnt[targetIndex].ingCount -= 1;
    }
    setIngCount(tempIngCnt);
  };
  const addInitialBtnHandler = (index) => {
    setModel(false);
    ingUpdate(index, 1);
  };
  const addHandler = (event) => {
    ingUpdate(event.target.id, 1);
  };
  const removeHandler = (event) => {
    let temp = [...ing];
    if (temp[event.target.id].ingCount === 0) {
      return;
    }
    ingUpdate(event.target.id, -1);
  };
  const totalIng = ing
    .map((el) => el.ingCount)
    .reduce((el, acc) => el + acc, 0);

  //******************************************************************

  //******************************************************************
  //Cart functionality(START),along with Model
  const fetchMeals = useCallback(() => {
    setLoadingState(true);
    fetch(
      "https://react-http-3d0d9-default-rtdb.firebaseio.com/-MdquxpaGp0BSa5Cvrpi.json"
    )
      .then((el) => el.json())
      .then((el) => {
        let data = Object.values(el);

        setLoadingState(false);
        setIngCount(data);
      })
      .catch((err) => {
        setLoadingErr(true);
      });
  }, [AuthCtx.isLoggedIn]);
  useEffect(() => {
    fetchMeals();
  }, []);
  useEffect(() => {
    if (ing.length === 0) return;
    if (ing.map((el) => el.ingCount).reduce((el, acc) => el + acc) === 0)
      return;
    setShowBump(true);
    const timer = setTimeout(() => {
      setShowBump(false);
    }, 300);
    return () => {
      clearInterval(timer);
    };
  }, [ing]);
  const btnClass = `${classes.button} ${showBup ? classes.bump : ""}`;
  const cartHandler = () => {
    const cartCount = ing
      .map((el) => el.ingCount)
      .reduce((el, acc) => el + acc, 0);
    if (cartCount === 0) return;
    setModel((prevState) => !prevState);
  };
  //***************************************************************
  //adding items in the Model Widnow
  const addHandlerModel = function (event) {
    ingUpdate(event.target.id, 1);
  };
  const removeHandlerModel = function (event) {
    ingUpdate(event.target.id, -1);
    setModel(false);
  };
  //******************************************************************

  //******************************************************************
  //-->BackDrop(removing)
  const removeBackDropHandler = () => {
    setModel(false);
  };
  //******************************************************************
  //close Model after ordering
  const closeModelHandler = () => {
    // setIngCount(arg);
    setModel(false);
  };
  useEffect(() => {
    return () => {
      console.log("[APP.js] removed");
    };
  }, []);
  return (
    <div className="App">
      {isLoading ? <BackDrop /> : null}
      {isLoading ? <Spinner /> : null}
      {AuthCtx.isLoggedIn && !isLoading ? (
        <React.Fragment>
          {showModel && totalIng ? (
            <BackDrop click={removeBackDropHandler} />
          ) : null}
          <CartHandlerContext.Provider
            value={{ cartHandler: cartHandler, classes: btnClass }}
          >
            <ItemCountContext.Provider
              value={{ ingCount: ing, clearCart: closeModelHandler }}
            >
              <Background />
              {isLoading ? (
                <React.Fragment>
                  <BackDrop />
                  {!loadingErr ? <Spinner /> : <ErrorComponent />}
                </React.Fragment>
              ) : (
                <MainCourse
                  addHandler={addHandler}
                  addInitialBtnHandler={addInitialBtnHandler}
                  removeHandler={removeHandler}
                  ing={ing}
                  items={items}
                />
              )}

              <AddItemCartContext.Provider
                value={{ addHandler: addHandlerModel }}
              >
                <RemoveItemCartContext.Provider
                  value={{ removeHandler: removeHandlerModel }}
                >
                  {/* {showModel && totalIng ? ( */}
                  <Model cartHandler={cartHandler} show={showModel} />
                  {/* // ) : null} */}
                </RemoveItemCartContext.Provider>
              </AddItemCartContext.Provider>
            </ItemCountContext.Provider>
          </CartHandlerContext.Provider>{" "}
        </React.Fragment>
      ) : null}
      {!AuthCtx.isLoggedIn && !isLoading ? <Auth /> : null}
    </div>
  );
}

export default App;
