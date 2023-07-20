import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function Game({ game, game_id, owned = true }) {
  const [home, setHome] = useState(false);
  const [gameToken, setGameToken] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // useEffect(() => {
  setTimeout(() => setGameToken(user?.token), 1000);

  useEffect(() => {
    if (location.pathname === "/") {
      setHome(true);
    }
  }, []);

  async function addToCollection(
    e,
    { gameId, gameTitle, gameImageUrl, gameToken }
  ) {
    e.preventDefault();

    console.log(gameTitle, "Title");
    console.log(gameToken, "Token");

    await fetch(`http://127.0.0.1:8000/collection/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${user?.token}`,
        "content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({
        game_atlas_id: gameId,
        title: gameTitle,
        image_url: gameImageUrl,
        token: gameToken,
      }),
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        window.location.reload();
        return response;
      }
    });
  }

  return (
    <div>
      <a href={`/Detail/${game_id}`}>
        <img className="gameimage" src={game.image_url} alt="" />
      </a>
      <br />
      {/* add a "house rule" option if the game is already owned */}
      {!owned ? (
        <button
          className="button"
          onClick={(e) =>
            addToCollection(e, {
              gameId: game.id,
              gameTitle: game.name,
              gameImageUrl: game.image_url,
              gameToken: gameToken,
            })
          }
        >
          Add To Collection
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
export default Game;
