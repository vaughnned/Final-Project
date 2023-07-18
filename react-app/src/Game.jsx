import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useLocalStorage from "./Login/UseLocalStorage";

function Game({ game, game_id, owned = true }) {
  const [home, setHome] = useState(false);
  const [gameToken, setGameToken] = useState("");
  // let [user, setUser, removeUser] = useLocalStorage("user");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // console.log(user?.token);

  useEffect(() => {
    setTimeout(() => setGameToken(user?.token), 1000);
    setTimeout(() => console.log(user), 100);
  }, [user?.token]);

  useEffect(() => {
    if (location.pathname === "/") {
      setHome(true);
    }
  }, []);

  async function addToCollection(
    e,
    { gameId, gameTitle, gameImageUrl, gameToken }
  ) {
    // const [gameToken, setGameToken] = useState("");
    // let [user, setUser, removeUser] = useLocalStorage("user");

    // useEffect(() => {
    //   setGameToken(user?.token);
    // }, []);
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
        // game_atlas_id: { gameId },
        // title: { gameTitle },
        // imageUrl: { gameImageUrl },
        // token: gameToken,
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
          className="add-button"
          onClick={(e) =>
            addToCollection(e, {
              gameId: game.id,
              gameTitle: game.handle,
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
