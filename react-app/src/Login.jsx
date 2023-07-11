import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [isValid, setIsValid] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async (e) => {
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
      setIsValid(true);
      Cookies.set("Authorization", `Token ${data.key}`);
      navigate("/");
    }

    // if login is valid
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSignUp}>
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
