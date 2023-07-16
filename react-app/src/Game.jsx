import React, { useEffect, useState } from "react";
import { AddToCollection } from "./AddToCollection";

function Game({ game, game_id, owned = true }) {
  const [home, setHome] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setHome(true);
    }
  }, []);

  return (
    <div>
      <a href={`/Detail/${game_id}`}>
        <img className="gameimage" src={game.image_url} alt="" />
      </a>
      <br />
      {/* add a "house rule" option if the game is already owned */}
      {!owned ? (
        <button
          onClick={(e) =>
            AddToCollection(e, {
              gameId: game.id,
              gameTitle: game.handle,
              gameImageUrl: game.image_url,
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
