import React, { useState, useEffect, useRef } from "react";
import "./styles/App.css";
// import { Carousel } from "@mantine/carousel";
import Header from "./Header";
import Game from "./Game";
import { getGames } from "./utils/api";

const Home = () => {
  let [games, setGames] = useState([]);
  let searchRef = useRef("");

  // useEffect(() => {
  //   getGames({ ids: ["08asLSfoZy"] }).then((g) => {
  //     setGames(g);
  //   });
  // }, []);

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
      <Header />
      <h1 id="title">Board Game App</h1>
      <p>
        Welcome to "insert name here"! Here you can share your love for board
        games with friends and see whose collection is more impressive!
      </p>

      {/* Search Feature */}
      <form onSubmit={search} className="search-form">
        <input
          className="search-bar"
          ref={searchRef}
          type="text"
          placeholder="Search for a game... "
        />
        <button type="submit">Search</button>
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
      <div id="home-grid" className="game-grid">
        {games.map((game) => (
          <Game game={game} key={game.id} owned={false} />
        ))}
      </div>
    </>
  );
};

export default Home;
