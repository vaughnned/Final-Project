import React, { useState, useEffect } from "react";
import "../styles/App.css";
import Game from "../Game";
import Cookies from "js-cookie";
import { Avatar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, FileButton, Button, Text } from "@mantine/core";
import useLocalStorage from "../utils/useLocalStorage";

function CollectionPage() {
  const [currentGame, setCurrentGame] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [user, setUser, removeUser] = useLocalStorage("user");
  const [houseRules, setHouseRules] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [hide, setHide] = useState(true);
  const [modalHidden, setModalHidden] = useState(true);
  const [houseData, setHouseData] = useState("");

  useEffect(() => {
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

      const data = await response.json();
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

  // const houseRuleForms = () => {
  //   setHouseRuleForm(false);
  // };

  const handleChange = (e) => {
    setHouseRules(e.target.value);
  };

  const handleHouseRules = async (event, game_id) => {
    event.preventDefault();
    const updateGame = async () => {
      await fetch(`http://127.0.0.1:8000/collection/game/${game_id}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${currentUser?.token}`,
          "content-type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify({
          house_rules: houseRules,
        }),
      })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            // window.location.reload();
            return response;
          }
        })
        .catch((error) => {
          console.error("THIS ISNT WORKING", error);
        });
    };
    const getHouseRules = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/collection/game/${game_id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${currentUser?.token}`,
            "content-type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        }
      );
      const data = await response.json();
      console.log(data.house_rules, "house data");
      return setHouseData(data.house_rules);
    };
    await updateGame();
    await getHouseRules();
  };

  const addImage = async (imgSrc, user) => {
    const formData = new FormData();
    formData.append("image", imgSrc);
    let response = await fetch(
      `http://localhost:8000/auth/user/profile/${user.id}/`,
      {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Token ${user?.token}`,
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      }
    );
    const data = await response.json();

    setUser({ ...currentUser, avatar: data.image });

    location.reload();
    return data;
  };

  const editRules = (game) => {
    setCurrentGame(game);
    open();
  };

  const hideButton = () => {
    setHide(false);
  };

  const hideModal = () => {
    setModalHidden(false);
  };

  return (
    <>
      <div id="profile">
        <img src="/images/sword.png" id="sword-left" alt="" />
        <Avatar
          id="avatar"
          onClick={hideButton}
          src={currentUser.avatar}
          alt="it's me"
          radius={100}
          size={200}
        />
        <img src="/images/sword.png" id="sword-right" alt="" />

        {!hide ? (
          <Group position="center">
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => <Button {...props}>Upload image</Button>}
            </FileButton>
            <button onClick={() => addImage(file, currentUser)}>Save</button>
          </Group>
        ) : (
          ""
        )}
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Avatar Preview"
            style={{ maxWidth: "200px" }}
          />
        )}

        <div className="modal-view">
          <Modal opened={opened} onClose={close} title="House Rules" centered>
            {modalHidden ? (
              <>
                <p>HEY{houseData}</p>
                <button onClick={hideModal}>Edit House Rules</button>
              </>
            ) : (
              <form
                className="modal"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleHouseRules(event, currentGame.id);
                  setCurrentGame(null);
                  hideModal(true);
                  close();
                }}
              >
                <textarea
                  rows={10}
                  className="modal-input"
                  type="textarea"
                  placeholder="Got any House rules???"
                  onChange={handleChange}
                />
                <button id="modal-button" type="submit">
                  Save
                </button>
              </form>
            )}
          </Modal>
        </div>
        {/* {!houseRuleForm ? ( */}
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
              <button className="button" onClick={() => editRules(game)}>
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
