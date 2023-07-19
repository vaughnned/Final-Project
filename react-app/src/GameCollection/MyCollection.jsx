import React, { useState, useEffect } from "react";
import "../styles/App.css";
import Game from "../Game";
import Cookies from "js-cookie";
import { Avatar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import useLocalStorage from "../utils/useLocalStorage";

function CollectionPage() {
  const [games, setGames] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [user, setUser, removeUser] = useLocalStorage("user");

  const [houseRuleForm, setHouseRuleForm] = useState(true);
  const [houseRules, setHouseRules] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    // setGameToken(user?.token);
    // console.log(user?.token);
    console.log(currentUser, "USER");

    const getUserGames = async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Token ${currentUser?.token}`,
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
    await fetch(`http://127.0.0.1:8000/collection/delete/${gameId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${currentUser?.token}`,
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
    setHouseRuleForm(false);
  };

  const handleHouseRules = (e) => {
    setHouseRules(e.target.value);
  };
  console.log(houseRules, "house rule");

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   console.log(file);
  //   setProfilePic(file.name);
  // };

  useEffect(() => {
    console.log(user, "CHANGE");
  }, [user]);

  // const handleSubmit = () => {
  //   // e.preventDefault();
  //   setCurrentUser({
  //     firstName: currentUser.firstName,
  //     email: currentUser.email,
  //     token: currentUser.token,
  //     profilePic: profilePic,
  //   });
  // };

  return (
    <>
      {/* <h1 className="title">The Armory</h1> */}
      <div id="profile">
        {/* <img className="profile-pic" id="armory-pic" src="" alt="" /> */}
        <Avatar
          src={profilePic}
          alt="it's me"
          radius={100}
          size={200}
          onClick={open}
        />
        {/* {!houseRuleForm ? ( */}
        <div>
          <Modal opened={opened} onClose={close} title="House Rules" centered>
            <form className="modal" onSubmit={handleHouseRules}>
              <textarea
                rows={10}
                className="modal-input"
                type="textarea"
                placeholder="Got any House rules???"
                onChange={() => handleHouseRules(e)}
              />
              <button id="modal-button" type="submit">
                Save
              </button>
            </form>
          </Modal>
        </div>
        {/* ) : (
          ""
        )} */}
        {/* <Modal opened={opened} onClose={close} title="Authentication" centered>
          <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button type="Submit">Save</button>
          </form>
        </Modal> */}
        {/* 
        <h1 id="profile-username">{user.firstName}</h1>
        <h3 id="profile-desc">Favorite Game:</h3> */}
      </div>

      <h1 className="title">{currentUser.firstName}'s Armory</h1>

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
              <button className="button" onClick={open}>
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
