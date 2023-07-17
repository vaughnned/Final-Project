import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import useLocalStorage from "./UseLocalStorage";

const RegisterComponent = () => {
  const [isValid, setIsValid] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser, removeUser] = useLocalStorage("user");
  const navigate = useNavigate();

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log("something");
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({
        username: username,
        password: password,
        password1: password,
        password2: password,
      }),
    };

    const response = await fetch(
      "http://127.0.0.1:8000/dj-rest-auth/registration/",
      options
    ).catch((error) => {
      console.error("THIS ISNT WORKING", error);
    });

    const data = await response.json();
    if (!response.ok) {
      console.log({ response });
    } else {
      console.log({ data });
      setUser({
        firstName: "Vaughn",
        email: "vaughn@nedderman.com",
        token: data.key,
      });
      Cookies.set("Authorization", `Token ${data.key}`);
      setIsValid(true);
      // navigate("/");
    }

    // if Register is valid
  };
  return (
    <div id="login-page">
      <Header />
      <section id="login-form">
        <h1>Register</h1>
        <form className="login-inputs" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => handleUsernameInput(e)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => handlePasswordInput(e)}
          />
          <div id="sign-in">
            <input id="submit-button" type="submit" />|
            <a className="sign-up" href="/login">
              Login
            </a>
          </div>
        </form>
      </section>
    </div>
  );
};

export default RegisterComponent;
