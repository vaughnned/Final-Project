import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Avatar } from "@mantine/core";
import Game from "../Game";

function FriendCollection() {
  let [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [collectionData, setCollectionData] = useState([]);
  const [friendUser, setFriendUser] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getFriendCollection = async (id) => {
      const response = await fetch(`http://127.0.0.1:8000/collection/${id}/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${user.token}`,
          "content-type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      });
      const data = await response.json();
      console.log(data, "DATA");
      setCollectionData(data);
    };
    getFriendCollection(id);
  }, []);

  useEffect(() => {
    async function fetchData() {
      console.log(id);
      const options = {
        method: "GET",
        headers: {
          Authorization: `Token ${user?.token}`,
          "content-type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      };
      let response = await fetch("http://127.0.0.1:8000/auth/user/", options);
      const data = await response.json();

      console.log(data, "user data");
      data.forEach((item) => {
        if (item.id.toString() === id) {
          setFriendUser(item.username);
        }
      });
    }
    fetchData();
  }, []);

  return (
    <>
      {/* <h1 className="title">The Armory</h1> */}
      <div id="profile">
        {/* <img className="profile-pic" id="armory-pic" src="" alt="" /> */}
        <Avatar src="" alt="it's me" radius={100} size={200} onClick={open} />

        {/* 
        <h1 id="profile-username">{user.firstName}</h1>
        <h3 id="profile-desc">Favorite Game:</h3> */}
      </div>

      <h1 className="title">{friendUser}'s Armory</h1>
      <section className="collection-list">
        <div className="game-grid home-grid">
          {collectionData.map((game) => (
            <div key={game.game_atlas_id}>
              <h1 className="collection-title">
                {game.title.replace(/-/g, " ").toUpperCase()}
              </h1>
              <Game game={game} game_id={game.game_atlas_id} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default FriendCollection;
