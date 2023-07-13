import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import useLocalStorage from "../UseLocalStorage";

const LoginComponent = () => {
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

  const handleLogIn = async (e) => {
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
      }),
    };

    const response = await fetch(
      "http://localhost:8000/dj-rest-auth/login/",
      options
    ).catch((error) => {
      console.error("THIS ISNT WORKING", error);
    });

    const data = await response.json();
    if (!response.ok) {
      alert("Incorrect username or password");
    } else {
      setUser({
        firstName: "Vaughn",
        email: "vaughn@nedderman.com",
        token: data.key,
      });
      Cookies.set("Authorization", `Token ${data.key}`);
      setIsValid(true);
      navigate("/");
    }

    // if login is valid
  };
  return (
    <>
      <Header />
      <h1>Login</h1>
      <form onSubmit={handleLogIn}>
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
        <input type="submit" />
      </form>
    </>
  );
};

export default LoginComponent;
