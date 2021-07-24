import React, { useState, useEffect } from "react";
import classes from "./Meals.module.css";
import Food from "./FoodItem/Food";

const MainCourse = (props) => {
  let RESULTS_PER_PAGE = 4;
  const [pageNumber, setPageNumber] = useState(1);

  const [filterArray, setFilteredArray] = useState([]);
  const [showNext, setShowNext] = useState(false);
  const [showPrev, setShowPrev] = useState(false);
  const pagination = () => {
    let start = (pageNumber - 1) * RESULTS_PER_PAGE;
    let end = pageNumber * RESULTS_PER_PAGE;
    let arr = [...props.ing].slice(start, end);
    if (start === 0 && end === RESULTS_PER_PAGE) {
      setShowNext(true);
      setShowPrev(false);
    }
    if (start >= 0 && end < props.ing.length) {
      setShowNext(true);
    }
    if (start > 0) {
      setShowPrev(true);
    }
    if (end > props.ing.length) {
      setShowNext(false);
    }

    setFilteredArray(arr);
  };
  useEffect(() => {
    pagination();
  }, [pageNumber, props.ing]);

  const prevHandler = () => {
    setPageNumber((prevState) => prevState - 1);
  };
  const nextHandler = () => {
    setPageNumber((prevState) => prevState + 1);
  };
  return (
    <div className={classes.Container}>
      {filterArray.map((el, index) => {
        return (
          <Food
            key={el.index}
            index={el.index}
            dish={el.dish}
            foodDescription={el.foodDescription}
            price={el.price}
            add={props.addHandler}
            remove={props.removeHandler}
            amount={props.ing[el.index].ingCount}
            addInitially={props.addInitialBtnHandler}
          />
        );
      })}
      {showPrev ? (
        <button className={classes.btnPrev} onClick={prevHandler}>
          Previous
        </button>
      ) : null}
      {showNext ? (
        <button className={classes.btn} onClick={nextHandler}>
          Next
        </button>
      ) : null}
    </div>
  );
};
export default MainCourse;
