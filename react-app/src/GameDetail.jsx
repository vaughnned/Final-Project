import "./styles/App.css";
import { getGame, getPrice } from "./utils/api";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";

function GameDetail() {
  const [game, setGame] = useState();
  const [stores, setStores] = useState([]);

  let { gameId } = useParams();

  useEffect(() => {
    getGame(gameId).then((g) => setGame(g));
  }, [gameId]);

  useEffect(() => {
    getPrice(gameId).then((prices) => {
      console.log(prices, "prices");
      setStores(prices.filter((item) => item.name.includes(game.name)));
    });
  }, [gameId, game]);

  if (!game) {
    return <Loader />;
  }
  return (
    <div id="detail-page">
      <div className="detail-title">
        <h1>{game.name}</h1>
      </div>
      <img
        id="detail-image"
        className="gameimage game-grid"
        src={game.image_url}
        alt=""
      />
      <div className="game-desc">
        <p dangerouslySetInnerHTML={{ __html: game.description }} />
      </div>
      <h1 id="price-title">Check out some purchase options for {game.name}!</h1>
      <section className="game-prices">
        {stores.slice(0, 3).map((store) => (
          <div className="price-box" key={store.store_name}>
            <h2>
              <a href={store.url}>{store.store_name}</a>
            </h2>
            <h3 className="price-name">{store.name}</h3>
            <p className="price-number">{store?.price_text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default GameDetail;
