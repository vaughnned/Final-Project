import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Header from "./Header";

const ProfileComponent = ({ game }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [gameData, setGameData] = useState([]);

  const gameId = gameData;

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  };
  const handleImageUpload = (e) => {
    setImage(e.target.value);
  };

  // console.log(title, image);

  const createGame = async (e) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:8000/add-game/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({
        title: title,
        image: image,
      }),
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        window.location.reload();
        return response;
      }
    });
  };

  const getGame = async () => {
    let response = await fetch(`http://127.0.0.1:8000/collection/`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });
    const data = await response.json();
    console.log(data[0].id);

    setGameData(data);
  };

  useEffect(() => {
    getGame();
  }, []);

  const deleteGame = (gameId) => {
    fetch(`http://127.0.0.1:8000/collection/${gameId}/`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          window.location.reload();
          return response;
        }
      })
      .catch((error) => {
        console.error("THIS ISNT WORKING", error);
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
      {gameData.map((game, index) => (
        <div key={index}>
          <h1>{game.title}</h1>
          <p>{game.image}</p>
          <button type="delete" onClick={() => deleteGame(game.id)}>
            Remove
          </button>
        </div>
      ))}
    </>
  );
};

export default ProfileComponent;
