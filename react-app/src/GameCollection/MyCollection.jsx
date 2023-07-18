import React, { useState, useEffect } from "react";
import "../styles/App.css";

import Game from "../Game";
import Cookies from "js-cookie";

function CollectionPage() {
  const [games, setGames] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [houseRuleForm, setHouseRuleForm] = useState(false);
  const [houseRules, setHouseRules] = useState(false);

  useEffect(() => {
    // setGameToken(user?.token);
    // console.log(user?.token);
    console.log(user, "USER");

    const getUserGames = async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Token ${user?.token}`,
          "content-type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      };

      let response = await fetch(`http://127.0.0.1:8000/collection/`, options);
      console.log(options, "HEADERS");

      const data = await response.json();
      console.log(data, "Get Game");
      setGameData(data);
    };
    getUserGames();
    // load game ids from the game model
    // console.log(gameData, "GAMEDATA");
    // getGames({ ids: gameData }).then((g) => {
    //   setGames(g);
    // });
  }, []);
  // make a useEffect and redirect if user isnt logged in
  const deleteGame = async (gameId) => {
    await fetch(`http://127.0.0.1:8000/collection/${gameId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${user?.token}`,
        "content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          window.location.reload();
          return response;
        }
      })
      .catch((error) => {
        console.error("THIS ISNT WORKING", error);
      });
  };

  const houseRuleForms = () => {
    setHouseRuleForm(true);
  };

  const handleHouseRules = (e) => {
    setHouseRules(e.target.value);
  };

  return (
    <>
      <h1 className="title">The Armory</h1>
      <button id="sort-button">Sort By</button>
      {houseRuleForm ? (
        <div>
          <form onSubmit={setHouseRuleForm("")}>
            <input
              type="text"
              placeholder="Got any House rules???"
              onChange={() => handleHouseRules(e)}
            />
          </form>
        </div>
      ) : (
        ""
      )}
      <section className="collection-list">
        {/* map through database to display the user's game collection  */}

        <div className="game-grid home-grid">
          {gameData.map((game) => (
            <div key={game.game_atlas_id}>
              {/* <section className="collection-title"> */}
              <h1 className="collection-title">
                {game.title.replace(/-/g, " ").toUpperCase()}
              </h1>
              {/* </section> */}
              <Game game={game} game_id={game.game_atlas_id} />
              <button className="button" onClick={() => houseRuleForms()}>
                Add House Rules
              </button>
              |
              <button className="button" onClick={() => deleteGame(game.id)}>
                Remove from collection
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default CollectionPage;
