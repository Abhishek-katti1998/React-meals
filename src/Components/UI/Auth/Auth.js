import { useState, useRef, useContext, useEffect } from "react";
import AuthContext from "../../../Context/AuthContext";
import classes from "./Auth.module.css";
const AuthForm = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [err, setError] = useState("");
  const emailRef = useRef();
  const paswRef = useRef();
  const AuthCtx = useContext(AuthContext);
  const [uiMessege, setUiMessege] = useState("");
  let timer;
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const sendRequest = (authType, enteredEmail, enteredPasw) => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:${authType}?key=AIzaSyBS2vrF95v8o6QtjIvL2SHVPeYrknZVsFU`,
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPasw,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((el) => {
        if (el && el.error?.message) {
          const { message: errMessage } = el.error;

          setError(errMessage);
        } else {
          if (authType === "signInWithPassword") {
            const expirationTime = new Date(
              new Date().getTime() + Number(el.expiresIn) * 1000
            );
            AuthCtx.logIn(el.idToken, expirationTime, enteredEmail);
          } else {
            setUiMessege("Succesfully Created Account!!Please login:)");
            timer = setTimeout(() => {
              setUiMessege("");
            }, 4000);
          }
        }
      });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPasw = paswRef.current.value;

    if (isLogin) {
      sendRequest("signInWithPassword", enteredEmail, enteredPasw);
    } else {
      sendRequest("signUp", enteredEmail, enteredPasw);
    }
    emailRef.current.value = "";
    paswRef.current.value = "";
  };
  useEffect(() => {
    localStorage.removeItem("name");
    localStorage.removeItem("data");
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <section className={classes.auth}>
      <p style={{ color: "green" }}>{uiMessege}</p>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={paswRef} required />
        </div>
        <p style={{ color: "red" }}>{err}</p>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
