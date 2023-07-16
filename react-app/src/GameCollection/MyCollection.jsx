import React, { useState, useEffect } from "react";
import "../styles/App.css";
import Header from "../Header";
import Game from "../Game";
import Cookies from "js-cookie";
import { deleteGame } from "./CollectionCrud";

function CollectionPage() {
  const [games, setGames] = useState([]);
  const [gameData, setGameData] = useState([]);
  console.log(gameData, "here");

  useEffect(() => {
    const getUserGames = async () => {
      let response = await fetch(`http://127.0.0.1:8000/collection/`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      });
      console.log("RESPONSE");
      const data = await response.json();
      console.log(data, "Get Game");
      setGameData(data);
    };
    getUserGames();
    // load game ids from the game model
    console.log({ gameData }, "GAMEDATA");
    // getGames({ ids: gameData }).then((g) => {
    //   setGames(g);
    // });
  }, []);
  // make a useEffect and redirect if user isnt logged in
  return (
    <>
      <Header />

      <h1>MY COLLECTION</h1>
      <button id="sort-button">Sort By</button>
      <section className="collection-list">
        {/* map through database to display the user's game collection  */}

        <div id="collection-grid" className="game-grid">
          {gameData.map((game) => (
            <div key={game.game_atlas_id}>
              <h1>{game.title}</h1>
              <Game game={game} game_id={game.game_atlas_id} />
              <button onClick={() => deleteGame(game.id)}>Delete</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default CollectionPage;
