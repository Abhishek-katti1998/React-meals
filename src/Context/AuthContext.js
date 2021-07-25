import React, { useState } from "react";
export const AuthContext = React.createContext({
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
  resetEmail: () => {},
  setDisplayName: () => {},
  authToken: "",
  emailId: "",
  Name: "",
});
export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialEmail = localStorage.getItem("email");
  const [token, setToken] = useState(initialToken);
  const [emailId, setEmailId] = useState(initialEmail);
  const [name, setName] = useState("");
  let timer;
  const logOutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken(null);
    if (timer) {
      clearTimeout(timer);
    }
  };
  const remainingExpTime = (expirationTimeStamp) => {
    return new Date(expirationTimeStamp).getTime() - new Date().getTime();
  };
  const setDisplayName = (name) => {
    setName(name);
  };
  const loginHandler = (token, expirationTime, email) => {
    setToken(token);
    setEmailId(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    const remainingTime = remainingExpTime(expirationTime);
    timer = setTimeout(logOutHandler, remainingTime);
  };
  const authContextValue = {
    isLoggedIn: !!token,
    logIn: loginHandler,
    logOut: logOutHandler,
    authToken: token,
    setDisplayName: setDisplayName,
    emailId,
    Name: name,
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
