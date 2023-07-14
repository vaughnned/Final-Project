import React from "react";

function Game({ game, owned = true }) {
  return (
    <div>
      <a href={`/Detail/${game.id}`}>
        <img className="gameimage" src={game.image_url} alt="" />
      </a>
      <br />
      {!owned ? <button>Add To Collection</button> : ""}
    </div>
  );
}
export default Game;
