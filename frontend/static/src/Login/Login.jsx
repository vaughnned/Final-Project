import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../utils/useLocalStorage";

const LoginComponent = () => {
  const [isValid, setIsValid] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser, removeUser] = useLocalStorage("user");
  // const [currentToken, setCurrentToken] = useState();
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();
  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const getProfile = async (token, name, email, userId) => {
    const response = await fetch(`/auth/user/profile/${userId}/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });
    const data = await response.json();
    setUser({
      firstName: name,
      email: email,
      token: token,
      avatar: data.image,
      id: userId,
    });
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

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
    console.log(options.headers, "HEADERS");

    const response = await fetch("/auth/login/", options).catch((error) => {
      console.error("THIS ISNT WORKING", error);
    });

    const data = await response.json();
    if (!response.ok) {
      alert("Incorrect username or password");
    } else {
      Cookies.set("Authorization", `Token ${data.key}`);
      await getProfile(
        data.key,
        username,
        "username@example.com",
        data.profile_id
      );
      setIsValid(true);
      navigate("/");
    }
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
