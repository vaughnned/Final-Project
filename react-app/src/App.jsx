import React, { useState, useEffect } from "react";
import "./App.css";
import { Carousel } from "@mantine/carousel";
// import { BrowserRouter } from "react-router-dom";

const App = () => {
  let [gameData, setGameData] = useState([]);
  let [gameImage, setGameImage] = useState([]);
  let [gameDesc, setGameDesc] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getGames = async () => {
      try {
        let response = await fetch(
          "https://api.boardgameatlas.com/api/search?&limit=3&random=True&client_id=4Hi148hUNY"
        );
        let gameListData = await response.json();
        let game1 = gameListData.games[0].handle;
        let game2 = gameListData.games[1].handle;
        let game3 = gameListData.games[2].handle;
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
        <a id="home" href="http://localhost:5173/">
          Home
        </a>
        {/* <BrowserRouter basename="/app"> */}
        {/* <Route path="/Collection"> */}
        <a id="home">Collection</a>
        {/* </Route> */}
        {/* </BrowserRouter> */}
        <nav id="head">
          <div>Friends</div>
          <div>Profile</div>
          <div>Drop Down</div>
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
            <h1 className="gametitle">{gameData[0]}</h1>
            <img className="gameimage" src={gameImage[0]} alt="" />
          </Carousel.Slide>
          <Carousel.Slide>
            <h1 className="gametitle">{gameData[1]}</h1>
            <img className="gameimage" src={gameImage[1]} alt="" />
          </Carousel.Slide>
          <Carousel.Slide>
            <h1 className="gametitle">{gameData[2]}</h1>
            <img className="gameimage" src={gameImage[2]} alt="" />
          </Carousel.Slide>
        </Carousel>
      </div>
      <div id="card-list">
        <div>
          <h1>{gameData[0]}</h1>
          <p>{gameDesc[0]}</p>
        </div>
        <div>
          <h1>{gameData[1]}</h1>
          <p>{gameDesc[1]}</p>
        </div>
        <div>
          <h1>{gameData[2]}</h1>
          <p>{gameDesc[2]}</p>
        </div>
      </div>
    </>
  );
};

export default App;
