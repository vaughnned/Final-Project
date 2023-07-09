import React, { useState, useEffect } from "react";
import "./App.css";
// import CollectionPage from "./collection.jsx";
import { Carousel } from "@mantine/carousel";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";
// function DropDown() {
//   const [opened, { toggle }] = useDisclosure(false);
//   const label = opened ? "Close navigation" : "Open navigation";
// }

const App = () => {
  let [gameData, setGameData] = useState([]);
  let [gameImage, setGameImage] = useState([]);
  let [gameDesc, setGameDesc] = useState([]);

  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? "Close navigation" : "Open navigation";

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getGames = async () => {
      try {
        let response = await fetch(
          "https://api.boardgameatlas.com/api/search?&limit=3&&client_id=4Hi148hUNY"
        );
        let gameListData = await response.json();

        for (let i = 0; i < 3; i++) {
          gameData[i] = gameListData.games[i].handle;
          gameImage[i] = gameListData.games[i].image_url;
          gameDesc[i] = gameListData.games[i].description_preview;
        }
        console.log(gameListData.games);
        setTimeout(() => {
          setLoading(false);
        }, 10);
      } catch (error) {
        console.error(error);
      }
    };
    getGames(gameData);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <header>
        <a className="pagenav" href="/">
          Home
        </a>
        <a className="pagenav" href="/Collection">
          Collection
        </a>

        <nav id="head">
          <div>Friends</div>
          <div>Profile</div>
          <div>
            <Burger
              margin="0"
              color="#FFFFFF"
              opened={opened}
              onClick={toggle}
              aria-label={label}
            />
          </div>
        </nav>
      </header>
      <h1 id="title">Board Game App</h1>
      <p>
        Welcome to "insert name here"! Here you can share your love for board
        games with friends and see whose collection is more impressive!
      </p>
      <div id="carousel">
        <Carousel id="carousel" maw={320} mx="auto" withIndicators height={300}>
          <Carousel.Slide>
            <h1 className="gametitle">{gameData[0].toUpperCase()}</h1>
            <img className="gameimage" src={gameImage[0]} alt="" />
          </Carousel.Slide>
          <Carousel.Slide>
            <h1 className="gametitle">{gameData[1].toUpperCase()}</h1>
            <img className="gameimage" src={gameImage[1]} alt="" />
          </Carousel.Slide>
          <Carousel.Slide>
            <h1 className="gametitle">{gameData[2].toUpperCase()}</h1>
            <img className="gameimage" src={gameImage[2]} alt="" />
          </Carousel.Slide>
        </Carousel>
      </div>
      <div id="card-list">
        <div>
          <h1>{gameData[0].toUpperCase()}</h1>
          <p>{gameDesc[0]}</p>
        </div>
        <div>
          <h1>{gameData[1].toUpperCase()}</h1>
          <p>{gameDesc[1]}</p>
        </div>
        <div>
          <h1>{gameData[2].toUpperCase()}</h1>
          <p>{gameDesc[2]}</p>
        </div>
      </div>
    </>
  );
};

function Collection() {
  return <h2>Collection</h2>;
}

export default App;
