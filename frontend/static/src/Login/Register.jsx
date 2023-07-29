import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import useLocalStorage from "../utils/useLocalStorage";

const RegisterComponent = () => {
  const [isValid, setIsValid] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [state, setState] = useState({
    title: "",
    image: null,
  });

  const [user, setUser, removeUser] = useLocalStorage("user");
  const navigate = useNavigate();

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword1Input = (e) => {
    setPassword1(e.target.value);
  };
  const handlePassword2Input = (e) => {
    setPassword2(e.target.value);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setState((prevState) => ({
      ...prevState,
      image: file,
    }));
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

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log("something");
    // formData.append("title", state.title);
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({
        username,
        email,
        password1,
        password2,
      }),
    };

    const response = await fetch("/dj-rest-auth/registration/", options).catch(
      (error) => {
        console.error("THIS ISNT WORKING", error);
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.log({ response });
    } else {
      console.log(data, "data");
      await getProfile(
        data.key,
        username,
        "username@example.com",
        data.profile_id
      );

      console.log(user);
      Cookies.set("Authorization", `Token ${data.key}`);
      setIsValid(true);
      navigate("/");
    }

    // if Register is valid
  };
  return (
    <div id="login-page">
      <section id="login-form">
        <h1 id="register">Register</h1>
        <form className="login-inputs" onSubmit={handleRegister}>
          Username:
          <input
            type="text"
            placeholder="username..."
            value={username}
            onChange={(e) => handleUsernameInput(e)}
          />
          Email:
          <input
            type="email"
            placeholder="email..."
            value={email}
            onChange={(e) => handleEmailInput(e)}
          />
          Password:
          <input
            type="password"
            placeholder="password..."
            value={password1}
            onChange={(e) => handlePassword1Input(e)}
          />
          Confirm Password:
          <input
            type="password"
            placeholder="confirm password..."
            value={password2}
            onChange={(e) => handlePassword2Input(e)}
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
