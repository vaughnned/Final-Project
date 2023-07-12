import React, { useState } from "react";
import Cookies from "js-cookie";
import Header from "./Header";

const ProfileComponent = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  };
  const handleImageUpload = (e) => {
    setImage(e.target.value);
  };

  console.log(title, image);

  const createGame = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/collection/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // "Access-Control-Allow-Origin": "http://localhost:5173/",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({
        title: title,
        image: image,
      }),
    });
  };

  return (
    <>
      <Header />
      <h1>Joe's Profile</h1>
      <section id="profile-reviews">
        <div>Review 1</div>
        <div>Review 2</div>
      </section>
      <form onSubmit={createGame}>
        <input
          type="text"
          placeholder="Title... "
          onChange={(e) => handleTitleInput(e)}
        />
        <input
          type="file"
          placeholder="Image... "
          onChange={(e) => handleImageUpload(e)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ProfileComponent;
