import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Header from "./Header";
import RenderCollection from "./GameCollection/RenderCollection";
// import ImageUploadForm from "./ImageUpload";

const ProfileComponent = () => {
  const [title, setTitle] = useState("");
  // const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0].name);
  };
  // console.log(selectedFile);

  // if (!selectedFile) {
  //   setUploadMessage("Select an image to display. ");
  //   return;
  // }

  const formData = new FormData();
  formData.append("image_file", selectedFile);

  // const handleImageUpload = (e) => {
  //   setImage(e.target.value);
  // };

  const createGame = async (e) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:8000/add-game/", {
      method: "POST",
      data: formData,
      headers: {
        "content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({
        title: title,
        image: selectedFile,
      }),
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        window.location.reload();
        return response;
      }
    });
  };

  // console.log(title, image);

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
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit">Submit</button>
        <p>{uploadMessage}</p>
      </form>
      <RenderCollection imageUrl={selectedFile} />
      {/* <img className="collection-image" src={selectedFile} /> */}
    </>
  );
};

export default ProfileComponent;
