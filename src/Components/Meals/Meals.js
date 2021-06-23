import React, { useState, useEffect } from "react";
import classes from "./Meals.module.css";
import Food from "./FoodItem/Food";

const MainCourse = (props) => {
  console.log("render__called_MEAL.js");
  return (
    <div className={classes.Container}>
      {/* <Food dish="Sushi" foodDescription="fesh fish and veggies" price="$22" /> */}
      {props.items.map((el, index) => (
        <Food
          key={index}
          index={index}
          dish={el.dish}
          foodDescription={el.foodDescription}
          price={el.price}
          add={props.addHandler}
          remove={props.removeHandler}
          amount={props.ing[index].ingCount}
        />
      ))}
    </div>
  );
};
export default MainCourse;
