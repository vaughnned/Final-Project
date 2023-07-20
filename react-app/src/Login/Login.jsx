import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../utils/useLocalStorage";

const LoginComponent = () => {
  const [isValid, setIsValid] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser, removeUser] = useLocalStorage("user");
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    console.log("Cookie", Cookies.get("csrftoken"));
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftsoken"),
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    console.log(options.headers, "HEADERS");

    const response = await fetch(
      "http://localhost:8000/auth/login/",
      options
    ).catch((error) => {
      console.error("THIS ISNT WORKING", error);
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      alert("Incorrect username or password");
    } else {
      setUser({
        firstName: username,
        email: "username@example.com",
        token: data.key,
        avatar: data,
      });
      Cookies.set("Authorization", `Token ${data.key}`);
      setIsValid(true);
      navigate("/");
      location.reload();
    }
    console.log(user, "USER");

    // if login is valid
  };
  return (
    <div id="login-page">
      <section id="login-form">
        <h1>Login</h1>
        <form className="login-inputs" onSubmit={handleLogIn}>
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
            <a className="sign-up" href="/register">
              Sign Up
            </a>
          </div>
        </form>
      </section>
    </div>
  );
};

export default LoginComponent;
