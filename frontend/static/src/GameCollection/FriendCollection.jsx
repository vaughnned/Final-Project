import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Avatar } from "@mantine/core";
import Game from "../Game";

function FriendCollection() {
  let [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [collectionData, setCollectionData] = useState([]);
  const [userData, setUserData] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getFriendCollection = async (id) => {
      const response = await fetch(`/collection/${id}/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${user.token}`,
          "content-type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      });
      const data = await response.json();
      // console.log(data, "DATA");
      setCollectionData(data);
    };
    getFriendCollection(id);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Token ${user?.token}`,
          "content-type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      };
      let response = await fetch("/auth/user/profile/", options);
      const data = await response.json();

      for (let i = 0; i < data.length; i++) {
        if (data[i].user.toString() == id) {
          setUserData(data[i]);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div id="profile">
        {}
        <Avatar src={userData.image} alt="it's me" radius={100} size={200} />
      </div>

      <h1 className="title">{userData.username}'s Armory</h1>
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
