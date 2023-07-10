import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Carousel } from "@mantine/carousel";
import Header from "./Header";

const App = () => {
  let [games, setGames] = useState([]);
  let searchRef = useRef("");

  const getGames = async () => {
    let query = searchRef.current.value;
    console.log(query);
    try {
      // make an object such as INITIAL_DATA (my own personal json file) and copy over the fetch results
      let response = await fetch(
        `https://api.boardgameatlas.com/api/search?&name=${query}&fuzzy_match=true&limit=9&&client_id=4Hi148hUNY`
      );
      const jsonData = await response.json();

      setGames(jsonData.games);
      console.log(games);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  function search(e) {
    e.preventDefault();
    getGames();
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

      <div id="carousel">
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
      </div>
      {/* <div id="card-list">
        <div>
          <h1>{gameHandle[0].toUpperCase()}</h1>
          <p>{gameDesc[0]}</p>
        </div>
        <div>
          <h1>{gameHandle[1].toUpperCase()}</h1>
          <p>{gameDesc[1]}</p>
        </div>
        <div>
          <h1>{gameHandle[2].toUpperCase()}</h1>
          <p>{gameDesc[2]}</p>
        </div>
      </div> */}

      {/* Make this a component for re-use */}
      <div className="game-grid">
        {games.map((game, index) => (
          <a key={index} href={`/Detail/${game.id}`}>
            <img className="gameimage" src={game.image_url} alt="" />
          </a>
        ))}
      </div>
    </>
  );
};

export default App;
