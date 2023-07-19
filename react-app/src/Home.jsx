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

  return (
    <>
      <h1 className="title">Game Knight</h1>
      <p id="page-desc">
        "Welcome to Game Knight! Here you can share your love for board games
        with friends, by compare to see whose collection is more impressive, and
        much more! With Game Knight you can see what games your friends own and
        their reviews of other games, add to your own collection so you don't
        forget what games you own, and keep track of whose the king of game
        knight among your friends by logging what games you've played "
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

      {/* <div id="carousel">
        <Carousel id="carousel" maw={320} mx="auto" withIndicators height={300}>
          {games.map((game, index) => (
            <Carousel.Slide key={index}>
              <a href={`/Detail/${game.id}`}>
                <h1 className="gametitle">{game.handle.toUpperCase()}</h1>
                <img className="gameimage" src={game.image_url} alt="" />
              </a>
            </Carousel.Slide>
          ))}
        </Carousel>
        <Carousel id="carousel" maw={320} mx="auto" withIndicators height={300}>
          {games.map((game, index) => (
            <Carousel.Slide key={index}>
              <a href={`/Detail/${game.id}`}>
                <h1 className="gametitle">{game.handle.toUpperCase()}</h1>
                <img className="gameimage" src={game.image_url} alt="" />
              </a>
            </Carousel.Slide>
          ))}
        </Carousel>
        <Carousel id="carousel" maw={320} mx="auto" withIndicators height={300}>
          {games.map((game, index) => (
            <Carousel.Slide key={index}>
              <a href={`/Detail/${game.id}`}>
                <h1 className="gametitle">{game.handle.toUpperCase()}</h1>
                <img className="gameimage" src={game.image_url} alt="" />
              </a>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div> */}

      {/* Make this a component for re-use */}
      <div className="game-grid home-grid">
        {games.length <= 0 ? (
          <Loader />
        ) : (
          games.map((game) => (
            <Game game={game} game_id={game.id} key={game.id} owned={false} />
          ))
        )}
      </div>
    </>
  );
};

export default Home;
