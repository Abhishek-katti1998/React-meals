import classes from "./logout.module.css";
import AuthContext from "../../../Context/AuthContext";
import { useContext } from "react";
const Logout = () => {
  const ctx = useContext(AuthContext);
  return (
    <button className={classes.button} onClick={() => ctx.logOut()}>
      Logout
    </button>
  );
};
export default Logout;
