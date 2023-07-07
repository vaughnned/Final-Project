import React from "react";
import App from "./App.jsx";

const HandleLogin = async () => {
  //   const response = await fetch("http://127.0.0.1:8000/dj-rest-auth/login/");
  //   console.log(response);

  // if login is valid
  return (
    <>
      <h1>Login</h1>
      <App />
    </>
  );
  // else
  //   return <h1>Login Invalid</h1>;
};

export default HandleLogin;
