import React, { useContext } from "react";
const ItemCountContext = React.createContext({ ingCount: [] });
export default ItemCountContext;
const CartHandlerContext = React.createContext({
  cartHandler: function () {},
  classes: null,
});
const AddItemCartContext = React.createContext({ addHandler: function () {} });
const RemoveItemCartContext = React.createContext({
  removeHandler: function () {},
});
const AddInitially = React.createContext({
  addBtnHandler: function () {},
  removeFinally: function () {},
});
export { CartHandlerContext };
export { AddItemCartContext };
export { RemoveItemCartContext };
export { AddInitially };
