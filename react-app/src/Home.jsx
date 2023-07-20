import React, { useState, useEffect, useRef } from "react";
import "./styles/App.css";
import "./styles/Header.css";
import "./styles/Profile.css";
import "./styles/Collection.css";
import "./styles/Login.css";

import Game from "./Game";
import { getGames } from "./utils/api";
import { Loader } from "@mantine/core";

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  let [games, setGames] = useState([]);
  let searchRef = useRef("");

  useEffect(() => {
    getGames().then((g) => {
      setGames(g);
    });
  }, []);

  function search(e) {
    e.preventDefault();
    getGames({ query: searchRef.current.value }).then((g) => {
      setGames(g);
    });
  }

  console.log(user, "user");

  return (
    <>
      {/* <img className="backdrop" src="/images/brick-wall.jpeg" alt="" /> */}
      <img id="home-logo" src="/images/gameknight-logo.png" alt="" />
      <img id="torch-left" src="/images/Torch.png" alt="" />
      <img id="torch-right" src="/images/Torch.png" alt="" />
      <h1 className="title">Game Knight</h1>
      <p id="page-desc">
        Welcome to Game Knight, the ultimate haven for all gaming enthusiasts!
        Step into a realm where your gaming journey is bound to reach new
        heights of excitement and camaraderie. Here, you have the power to
        search for your favorite games, curate a personalized collection that
        defines your gaming identity, and embark on a thrilling adventure
        alongside your cherished companions. Unite with fellow gamers, compare
        your awe-inspiring collections, and revel in the joy of shared passions.
        Embrace the spirit of competition, discovery, and camaraderie as you
        delve into a world that celebrates the art of gaming. So, join us, and
        let the games begin!
      </p>

      {/* Search Feature */}
      <form onSubmit={search} className="search-form">
        <input
          className="search-bar"
          ref={searchRef}
          type="text"
          placeholder="Search for a game... "
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      {/* Make this a component for re-use */}
      <div className="game-grid home-grid">
        {games.length <= 0 ? (
          <Loader />
        ) : (
          games.map((game) => (
            <section className="whole-card">
              <Game game={game} game_id={game.id} key={game.id} owned={false} />
            </section>
          ))
        )}
      </div>
    </>
  );
};

export default Home;
