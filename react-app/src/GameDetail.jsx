import React from "react";
import "./App.css";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function GameDetail() {
  const [game, setGame] = useState();
  const [priceList, setPriceList] = useState([]);

  let { gameId } = useParams();
  useEffect(() => {
    const getGames = async () => {
      try {
        let response = await fetch(
          `https://api.boardgameatlas.com/api/search?ids=${gameId}&client_id=4Hi148hUNY`
        );
        const jsonData = await response.json();

        setGame(jsonData.games.shift());
      } catch (error) {
        console.error(error);
      }
    };
    const getPrice = async () => {
      try {
        let response = await fetch(
          `https://api.boardgameatlas.com/api/game/prices?game_id=${gameId}&client_id=4Hi148hUNY`
        );
        const jsonData = await response.json();
        // console.log({ jsonData });

        setPriceList(jsonData.gameWithPrices.us);
      } catch (error) {
        console.error(error);
      }
    };

    getGames();
    getPrice();
  }, [gameId]);

  const storeName = priceList.filter((item) => item.name.includes(game.name));

  console.log(storeName);

  if (!game) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <Header />
      <div className="detail-title">
        <h1>{game?.handle.toUpperCase()}</h1>
      </div>
      <img className="gameimage" src={game.image_url} alt="" />
      <div className="game-desc">
        <p>{game.description_preview}</p>
      </div>
      <h1>Check out some purchase options for {game.name}!</h1>
      <section className="game-prices">
        <div className="amazon">
          <h2>
            <a href={storeName[0]?.url}>{storeName[0]?.store_name}</a>
          </h2>
          <h3 className="price-name">{storeName[0]?.name}</h3>
          <p className="price-number">{storeName[0]?.price_text}</p>
        </div>
        <div>
          <h2>
            <a href={storeName[1]?.url}>{storeName[1]?.store_name}</a>
          </h2>
          <h3 className="price-name">{storeName[1]?.name}</h3>
          <p className="price-number">{storeName[1]?.price_text}</p>
        </div>
        <div>
          <h2>
            <a href={storeName[2]?.url}>{storeName[2]?.store_name}</a>
          </h2>
          <h3 className="price-name">{storeName[2]?.name}</h3>
          <p className="price-number">{storeName[2]?.price_text}</p>
        </div>
      </section>
    </>
  );
}

export default GameDetail;
