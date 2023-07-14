import React from "react";
import Header from "./Header";

export default function FriendsList() {
  return (
    <>
      <Header />
      <div id="friends-list">
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
      </div>
    </>
  );
}
