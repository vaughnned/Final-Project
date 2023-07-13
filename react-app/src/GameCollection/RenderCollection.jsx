import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

function RenderCollection({ imageUrl }) {
  const [gameData, setGameData] = useState([]);
  const gameId = gameData;

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
  console.log(gameData);
  return (
    <>
      {gameData.map((game, index) => (
        <div key={index}>
          <div className="collection-game">
            <h2 className="collection-title">{game.title}</h2>
            <img className="collection-image" src={game.image} />
          </div>
          <button type="delete" onClick={() => deleteGame(game.id)}>
            Remove
          </button>
        </div>
      ))}
    </>
  );
}
export default RenderCollection;
