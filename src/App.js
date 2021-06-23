import "./App.css";
import Background from "./Components/layout/header/header";
import MainCourse from "./Components/Meals/Meals";
import { useState, useEffect } from "react";
import ItemCountContext from "./Context/Item-count-context";
import { CartHandlerContext } from "./Context/Item-count-context";
import { AddInitially } from "./Context/Item-count-context";
// import { someThing } from "./Helpers/helper";
import classes from "./Components/layout/cartbtn/Button.module.css";
// import BackDrop from "./Components/UI/Backdrop/backdrop";
import {
  AddItemCartContext,
  RemoveItemCartContext,
} from "./Context/Item-count-context";
import Model from "./Components/UI/Model/Model";
import BackDrop from "./Components/UI/Backdrop/backdrop";
function App() {
  //+------------------------------------default Food Items(START)--------------------------------------------------------+

  const items = [
    {
      dish: "Sushi",
      foodDescription: "fesh fish and veggies",
      price: "$22",
      ingCount: 0,
    },
    {
      dish: "Schnitzel",
      foodDescription: "A general speciality",
      price: "$16",
      ingCount: 0,
    },
    {
      dish: "Bawarchi Biryani",
      foodDescription: "Hydrabad special",
      price: "$25",
      ingCount: 0,
    },
  ];

  //+------------------------------------default Food Items(END)--------------------------------------------------------+

  //---------------------------------------Main Course food items functionality(add and remove)(START)-------------------
  const [showModel, setModel] = useState(false);
  const [showBup, setShowBump] = useState(false);
  const [ing, setIngCount] = useState(items);
  const ingUpdate = (targetIndex, flag) => {
    let tempIngCnt = [...ing];

    if (flag === 1) tempIngCnt[targetIndex].ingCount += 1;
    if (flag === -1) {
      if (tempIngCnt[targetIndex].ingCount === 0) {
        console.log("clicked last time");
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

  //---------------------------------------Main Course food items functionality(add and remove)(END)-------------------

  //------------------------------------------Cart functionality(START),along with Model-----------------------------------------------------

  useEffect(() => {
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
  //---------------------------adding items in the Model Widnow(START)-------------------------------------------

  const addHandlerModel = function (event) {
    ingUpdate(event.target.id, 1);
  };
  const removeHandlerModel = function (event) {
    // if (event.target.id === 0) {
    //   setModel(false);
    // }

    ingUpdate(event.target.id, -1);
  };
  //---------------------------adding items in the Model Widnow()-------------------------------------------
  //--------------------------------------------Cart functionality(END),along with Model------------------------------------------------

  //--------------------------------BackDrop(removing)(START)---------------------------------------------------
  const removeBackDropHandler = () => {
    setModel(false);
  };
  //--------------------------------BackDrop(removing)(END)---------------------------------------------------

  console.log("render____called____App.js");
  return (
    <div className="App">
      {showModel && totalIng ? (
        <BackDrop click={removeBackDropHandler} />
      ) : null}
      <CartHandlerContext.Provider
        value={{ cartHandler: cartHandler, classes: btnClass }}
      >
        <ItemCountContext.Provider value={{ ingCount: ing }}>
          <Background />
          <AddInitially.Provider
            value={{
              addBtnHandler: addInitialBtnHandler,
            }}
          >
            <MainCourse
              addHandler={addHandler}
              removeHandler={removeHandler}
              ing={ing}
              items={items}
            />
          </AddInitially.Provider>

          <AddItemCartContext.Provider value={{ addHandler: addHandlerModel }}>
            <RemoveItemCartContext.Provider
              value={{ removeHandler: removeHandlerModel }}
            >
              {showModel && totalIng ? <Model /> : null}
            </RemoveItemCartContext.Provider>
          </AddItemCartContext.Provider>
        </ItemCountContext.Provider>
      </CartHandlerContext.Provider>
    </div>
  );
}

export default App;
