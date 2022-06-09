import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

//private for logged in users

function IsPrivate(props) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === true) {
    return props.children;
  } else {
    return <Navigate to="/signup" />;
  }
}

export default IsPrivate;
