import { useEffect } from "react";
import React from "react";

function HandleLogin() {
  useEffect(() => {
    const getLogin = async () => {
      try {
        let response = await fetch(
          "http://127.0.0.1:8000/dj-rest-auth/login/",
          { method: "GET" }
        );
        let loginData = await response.json();
        console.log(loginData);
      } catch (error) {
        console.error(error);
      }
    };
    getLogin();
  }, []);
  //   const response = await fetch("http://127.0.0.1:8000/dj-rest-auth/login/");
  //   console.log(response);

  // if login is valid
  return (
    <>
      <h1>Login</h1>
    </>
  );
  // else
  //   return <h1>Login Invalid</h1>;
}

export default HandleLogin;
