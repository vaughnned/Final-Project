import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";

export default function FriendsList() {
  const [userData, setUserData] = useState([]);
  let [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

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
      let response = await fetch("http://127.0.0.1:8000/auth/user/", options);
      const data = await response.json();
      console.log(data, "DATA");
      setUserData(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 id="friend-title">Friends</h1>

      {userData.map((user, index) => (
        <div key={index} id="friends-list">
          <div>
            <img className="profile-pic" src="" />
          </div>
          <div className="friend">
            <h1 className="friend-details">{user.username}</h1>
            <h2 className="friend-details">
              {user.username}'s favorite game is:
            </h2>
            <h3 className="friend-details">
              <a href={`collection/${user.id}`}>View Profile</a>
            </h3>
          </div>
        </div>
      ))}
      {/* <div id="friends-list">
        <h1 id="friend-title">Friends</h1>
        <div className="friend">
          <h1 className="friend-details">Joe Shmo</h1>
          <h2 className="friend-details">Joe's favorite game is:</h2>
          <h3 className="friend-details">
            <a href="#">View Profile</a>
          </h3>
        </div>
        <div className="friend">
          <h1 className="friend-details">Jill Shmill</h1>
          <h2 className="friend-details">Jill's favorite game is:</h2>
          <h3 className="friend-details">
            <a href="#">View Profile</a>
          </h3>
        </div>
        <div className="friend">
          <h1 className="friend-details">John Shmon</h1>
          <h2 className="friend-details">John's favorite game is:</h2>
          <h3 className="friend-details">
            <a href="#">View Profile</a>
          </h3>
        </div>
      </div> */}
    </>
  );
}
