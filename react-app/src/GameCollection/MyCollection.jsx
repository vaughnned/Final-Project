import React, { useState, useEffect } from "react";
import "../styles/App.css";
import Header from "../Header";
import RenderCollection from "./RenderCollection";
import { getGames } from "../utils/api";
import Game from "../Game";

function CollectionPage() {
  let [games, setGames] = useState([]);

  useEffect(() => {
    // load game ids from the game model
    getGames({ ids: ["08asLSfoZy"] }).then((g) => {
      setGames(g);
    });
  }, []);
  // make a useEffect and redirect if user isnt logged in
  return (
    <>
      <Header />

      <h1>MY COLLECTION</h1>
      <button id="sort-button">Sort By</button>
      <section className="collection-list">
        {/* map through database to display the user's game collection  */}
        {/* <RenderCollection /> */}
        <div className="game-grid">
          {games.map((game) => (
            <Game game={game} key={game.id} />
          ))}
        </div>
      </section>
    </>
  );
}

export default CollectionPage;
