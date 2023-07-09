import React from "react";
import "./App.css";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function GameDetail() {
  const [game, setGame] = useState();

  let { gameId } = useParams();
  useEffect(() => {
    const getGames = async () => {
      try {
        let response = await fetch(
          `https://api.boardgameatlas.com/api/search?ids=${gameId}&client_id=4Hi148hUNY`
        );
        const jsonData = await response.json();

        setGame(jsonData.games.shift());
        console.log(game);
      } catch (error) {
        console.error(error);
      }
    };
    getGames();
  }, [gameId]);
  if (!game) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <Header />
      <h1>{game?.handle.toUpperCase()}</h1>
      <img className="gameimage" src={game.image_url} alt="" />
    </>
  );
}

export default GameDetail;
